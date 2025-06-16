import { allSettled, fork } from 'effector';
import { v4 as uuidv4 } from 'uuid';
import { navigate } from 'vike/client/router';
import type { Mock } from 'vitest';

import { ROUTES } from '@/shared/config';

import { UserModel } from '../index';

// Мокаем зависимости
vi.mock('effector-storage/local');
vi.mock('uuid', () => ({ v4: vi.fn() }));
vi.mock('vike/client/router', () => ({ navigate: vi.fn() }));

describe('UserModel', () => {
    const mockUuid = 'mocked-uuid-123';
    let mockedUuidv4: Mock;

    beforeEach(() => {
        // Инициализация моков перед каждым тестом
        mockedUuidv4 = vi.mocked(uuidv4);

        mockedUuidv4.mockReturnValue(mockUuid);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('should generate new userId when empty', async () => {
        const model = UserModel;
        const scope = fork();

        const promise = allSettled(model.UserGate.open, { scope, params: {} });
        await vi.advanceTimersByTimeAsync(500);
        await promise;

        expect(mockedUuidv4).toHaveBeenCalled();
        expect(scope.getState(model.$userId)).toBe(mockUuid);
    });

    it('should keep existing userId', async () => {
        const model = UserModel;
        const existingUuid = 'existing-uuid';

        const scope = fork({
            values: [[model.$userId, existingUuid]],
        });

        const promise = allSettled(model.UserGate.open, { scope, params: {} });
        await vi.advanceTimersByTimeAsync(500);
        await promise;

        expect(uuidv4).not.toHaveBeenCalled();
        expect(scope.getState(model.$userId)).toBe(existingUuid);
    });

    it('should initialize surveyId as empty string when null', async () => {
        const model = UserModel;
        const scope = fork();

        const promise = allSettled(model.UserGate.open, { scope, params: {} });
        await vi.advanceTimersByTimeAsync(500);
        await promise;

        expect(scope.getState(model.$surveyId)).toBe('');
    });

    it('should preserve existing surveyId', async () => {
        const model = UserModel;
        const existingSurveyId = 'survey-123';

        const scope = fork({
            values: [[model.$surveyId, existingSurveyId]],
        });

        const promise = allSettled(model.UserGate.open, { scope, params: {} });
        await vi.advanceTimersByTimeAsync(500);
        await promise;

        expect(scope.getState(model.$surveyId)).toBe(existingSurveyId);
    });

    it('should navigate to test page', async () => {
        const model = UserModel;
        const scope = fork();

        await allSettled(model.redirectToTestPageFx, { scope });

        expect(navigate).toHaveBeenCalledWith(ROUTES.TEST);
    });
});
