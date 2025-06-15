import { allSettled, fork } from 'effector';

import { getPersonalityTypesWithCategoriesQuery } from '../../api';
import type { PersonalityTypesResponse } from '../../api/dto';
import { PersonalityTypes } from '../../types';
import { PersonalitiesModel } from '..';

describe('PersonalitiesModel', () => {
    // Создаем новую модель для каждого теста
    const createModel = () => PersonalitiesModel;

    // Создаем мок данных с использованием реальных типов
    const createMockData = (): PersonalityTypesResponse[] => [
        {
            category: 'Analysts',
            description: 'Rational and inventive',
            types: [
                {
                    code: PersonalityTypes.INTJ,
                    name: 'Architect',
                    descriptions: ['Description 1'],
                },
                {
                    code: PersonalityTypes.INTP,
                    name: 'Logician',
                    descriptions: ['Description 2'],
                },
            ],
        },
        {
            category: 'Diplomats',
            description: 'Empathetic and idealistic',
            types: [
                {
                    code: PersonalityTypes.INFJ,
                    name: 'Advocate',
                    descriptions: ['Description 3'],
                },
                {
                    code: PersonalityTypes.ENFJ,
                    name: 'Protagonist',
                    descriptions: ['Description 4'],
                },
            ],
        },
    ];

    beforeEach(() => {
        // Сбрасываем все моки перед каждым тестом
        vi.restoreAllMocks();
    });

    it('should start query when gate is opened', async () => {
        const model = createModel();
        const mockHandler = vi.fn().mockResolvedValue([]);

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, mockHandler]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it('should normalize and store data on successful response', async () => {
        const model = createModel();
        const mockData = createMockData();

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, async () => mockData]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        const expectedMap = {
            [PersonalityTypes.INTJ]: 'Architect',
            [PersonalityTypes.INTP]: 'Logician',
            [PersonalityTypes.INFJ]: 'Advocate',
            [PersonalityTypes.ENFJ]: 'Protagonist',
        };

        expect(scope.getState(model.$personalitiesMap)).toEqual(expectedMap);
    });

    it('should handle empty response correctly', async () => {
        const model = createModel();
        const mockData: PersonalityTypesResponse[] = [];

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, async () => mockData]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        expect(scope.getState(model.$personalitiesMap)).toEqual({});
    });

    it('should handle response with empty types arrays', async () => {
        const model = createModel();
        const mockData: PersonalityTypesResponse[] = [
            {
                category: 'Empty Category',
                description: 'No types here',
                types: [],
            },
        ];

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, async () => mockData]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        expect(scope.getState(model.$personalitiesMap)).toEqual({});
    });

    it('should not ignore personality types with invalid codes', async () => {
        const model = createModel();
        const mockData: PersonalityTypesResponse[] = [
            {
                category: 'Test Category',
                description: 'Test description',
                types: [
                    {
                        code: 'INVALID' as never, // Намеренно неверный код
                        name: 'Invalid Type',
                        descriptions: [],
                    },
                    {
                        code: PersonalityTypes.ISTJ,
                        name: 'Logistician',
                        descriptions: [],
                    },
                ],
            },
        ];

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, async () => mockData]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        const expectedMap = {
            INVALID: 'Invalid Type',
            [PersonalityTypes.ISTJ]: 'Logistician',
        };

        expect(scope.getState(model.$personalitiesMap)).toEqual(expectedMap);
    });

    it('should not update store on query failure', async () => {
        const model = createModel();
        const initialValue = {
            [PersonalityTypes.ESTJ]: 'Executive',
        };

        const scope = fork({
            values: [[model.$personalitiesMap, initialValue]],
            handlers: [
                [
                    getPersonalityTypesWithCategoriesQuery.__.executeFx,
                    async () => {
                        throw new Error('API failure');
                    },
                ],
            ],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        expect(scope.getState(model.$personalitiesMap)).toBe(initialValue);
    });

    it('should handle partial data in categories', async () => {
        const model = createModel();
        const mockData: PersonalityTypesResponse[] = [
            {
                category: 'Partial Category',
                description: 'Partial data',
                types: [
                    {
                        code: PersonalityTypes.ESFP,
                        name: 'Entertainer',
                        descriptions: ['Description 7'],
                    },
                    // Пропущен второй элемент
                ],
            },
            {
                category: 'Another Category',
                description: 'More data',
                types: [
                    {
                        code: PersonalityTypes.ENTP,
                        name: 'Debater',
                        descriptions: ['Description 8'],
                    },
                ],
            },
        ];

        const scope = fork({
            handlers: [[getPersonalityTypesWithCategoriesQuery.__.executeFx, async () => mockData]],
        });

        await allSettled(model.PersonalitiesInitialGate.open, { scope, params: {} });

        const expectedMap = {
            [PersonalityTypes.ESFP]: 'Entertainer',
            [PersonalityTypes.ENTP]: 'Debater',
        };

        expect(scope.getState(model.$personalitiesMap)).toEqual(expectedMap);
    });
});
