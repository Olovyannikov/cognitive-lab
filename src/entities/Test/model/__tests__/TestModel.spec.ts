import { allSettled, fork } from 'effector';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PreparedAnswer } from '../../api/types';
import { TestModel } from '../index';

vi.stubGlobal('scrollTo', vi.fn());

const mockQuestions = [
    { id: 1, text: 'Q1' },
    { id: 2, text: 'Q2' },
];

const mockAnswer = { index: 0, answer: { value: 5 }, isSingle: false, isMultiple: false } as PreparedAnswer;

describe('TestModel', () => {
    const model = TestModel;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initial state', () => {
        const scope = fork();
        expect(scope.getState(model.$scaleForm)).toEqual({ answers: [] });
        expect(scope.getState(model.$currentPage)).toBe(1);
        expect(scope.getState(model.$currentProgress)).toBe(0);
        expect(scope.getState(model.$currentQuestion)).toBeNull();
        expect(scope.getState(model.$currentValue)).toBeNull();
        expect(scope.getState(model.$isSplashScreenVisible)).toBe(true);
    });

    it('setSplashScreenVisibility updates splash screen state', async () => {
        const scope = fork();
        await allSettled(model.setSplashScreenVisibility, { scope, params: false });
        expect(scope.getState(model.$isSplashScreenVisible)).toBe(false);
    });

    it('formReset resets all stores', async () => {
        const scope = fork();
        await allSettled(model.setSplashScreenVisibility, { scope, params: false });
        await allSettled(model.formReset, { scope, params: undefined });
        expect(scope.getState(model.$isSplashScreenVisible)).toBe(true);
        expect(scope.getState(model.$scaleForm)).toEqual({ answers: [] });
        expect(scope.getState(model.$currentPage)).toBe(1);
        expect(scope.getState(model.$currentProgress)).toBe(0);
        expect(scope.getState(model.$currentValue)).toBeNull();
    });

    it('formPageChanged updates currentPage and triggers scroll', async () => {
        const scope = fork();
        await allSettled(model.formPageChanged, { scope, params: 2 });
        expect(scope.getState(model.$currentPage)).toBe(2);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    it('scaleFormFieldChanged updates $scaleForm', async () => {
        const scope = fork();
        await allSettled(model.scaleFormFieldChanged, { scope, params: mockAnswer });
        const answers = (scope.getState(model.$scaleForm) as { answers: (typeof mockAnswer)[] }).answers;
        expect(answers[0]).toEqual(mockAnswer);
    });

    it('progress updates when answers change', async () => {
        const scope = fork({
            values: [[model.$questions, mockQuestions]],
        });
        await allSettled(model.scaleFormFieldChanged, { scope, params: mockAnswer });
        // 1 ответ из 2 вопросов = 50%
        expect(scope.getState(model.$currentProgress)).toBe(50);
    });

    it('currentQuestion updates when page or questions change', async () => {
        const scope = fork({
            values: [[model.$questions, mockQuestions]],
        });
        await allSettled(model.formPageChanged, { scope, params: 2 });
        expect(scope.getState(model.$currentQuestion)).toEqual(mockQuestions[1]);
    });
});
