import { allSettled, fork } from 'effector';

import { getMainPageInfoQuery } from '../../api';
import type { MainPageResponse, StatisticsAndTrust } from '../../api/dto';
import { LandingModel } from '../index';

describe('LandingModel', () => {
    const model = LandingModel;

    const createStats = (): StatisticsAndTrust[] => [
        { primary_text: '100+', secondary_text: 'Projects' },
        { primary_text: '99%', secondary_text: 'Satisfaction' },
    ];

    it('should populate store correctly', async () => {
        const mockData = createStats();

        // 1. Исправляем структуру ответа API
        const apiResponse: MainPageResponse = [{ statistics_and_trust: mockData }];

        const scope = fork({
            handlers: [
                // 2. Возвращаем массив напрямую без обертки в result
                [getMainPageInfoQuery.__.executeFx, async () => apiResponse],
            ],
        });

        // 3. Запускаем запрос
        await allSettled(getMainPageInfoQuery.start, { scope });

        // 4. Проверяем обновление стора
        expect(scope.getState(model.$statisticsAndTrust)).toEqual(mockData);
    });

    it('should handle empty response', async () => {
        const scope = fork({
            handlers: [[getMainPageInfoQuery.__.executeFx, async () => []]],
        });

        await allSettled(getMainPageInfoQuery.start, { scope });
        expect(scope.getState(model.$statisticsAndTrust)).toEqual([]);
    });

    it('should extract first valid item', async () => {
        const correctData = createStats();
        const apiResponse: MainPageResponse = [{ statistics_and_trust: correctData }, { statistics_and_trust: [] }];

        const scope = fork({
            handlers: [[getMainPageInfoQuery.__.executeFx, async () => apiResponse]],
        });

        await allSettled(getMainPageInfoQuery.start, { scope });
        expect(scope.getState(model.$statisticsAndTrust)).toEqual(correctData);
    });
});
