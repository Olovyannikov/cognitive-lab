import { createEvent, createStore, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { isArray, isNumber } from 'lodash-es';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';

import { isValidAnswer } from '@/entities/Test/model/isValidAnswer';

import { getQuestionsQuery } from '../api';
import type { QuestionsResponse } from '../api/dto';
import type { Answers, MultiChoiceAnswer, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../api/types';
import { DELAY_MS } from './constants';
import { getProgress } from './getProgress';

export const TestModel = atom(() => {
    const TestGate = createGate();

    const formReset = createEvent();
    const setSplashScreenVisibility = createEvent<boolean>();

    const scaleFormFieldChanged = createEvent<PreparedAnswer>();

    const $scaleForm = createStore<Answers>({
        answers: [],
    })
        .reset(formReset)
        .on(scaleFormFieldChanged, (form, field) => {
            const updatedAnswers = [...form.answers];
            updatedAnswers[field.index] = field;
            return { ...form, answers: updatedAnswers };
        });

    const $currentPage = createStore(1).reset(formReset);
    const $currentProgress = createStore(0).reset(formReset);
    const $currentQuestion = createStore<QuestionsResponse | null>(null);
    const $currentValue = createStore<PreparedAnswer['answer'] | null>(null).reset(formReset);
    const $isSplashScreenVisible = createStore<boolean>(true);

    const directionChanged = createEvent<'forward' | 'backward'>();
    const $direction = createStore<'forward' | 'backward'>('forward').on(directionChanged, (_, dir) => dir);

    const formPageChanged = createEvent<number>();

    const delayedFormFieldChanged = delay(scaleFormFieldChanged, DELAY_MS);

    const $questions = restore(
        getQuestionsQuery.finished.success.map((el) => el.result),
        []
    );

    sample({
        clock: setSplashScreenVisibility,
        target: $isSplashScreenVisible,
    });

    sample({
        clock: [$currentPage, $questions, TestGate.open],
        source: {
            page: $currentPage,
            questions: $questions,
        },
        fn: ({ page, questions }) => {
            if (!questions) return null;
            return questions[page - 1];
        },
        target: $currentQuestion,
    });

    sample({
        clock: delayedFormFieldChanged,
        source: { page: $currentPage, progress: $currentProgress, direction: $direction, form: $scaleForm },
        filter: (params, field) => !field.isMultiple && params.direction === 'forward',
        fn: ({ page, progress, form }, answer) => {
            const currentAnswer = form.answers[page - 1];

            if (!isValidAnswer(currentAnswer)) return page;
            if (answer.showInput || !(answer?.answer as SingleChoiceAnswer).value) return page;
            if (
                (answer?.answer as SingleChoiceAnswer).value !== null &&
                (answer?.answer as SingleChoiceAnswer).value !== '' &&
                (answer?.answer as SingleChoiceAnswer).value !== undefined &&
                progress < 100
            ) {
                return page + 1;
            }

            return page;
        },
        target: formPageChanged,
    });

    sample({
        clock: scaleFormFieldChanged,
        source: {
            form: $scaleForm,
            page: $currentPage,
        },
        filter: (_, field) => !(field.isMultiple || field.isSingle),
        fn: ({ form, page }) => {
            const currentPage = page - 1;

            if (form.answers && form.answers.length > 0 && 'value' in form.answers[currentPage].answer) {
                if (!form.answers[currentPage].answer.value) return null;
                return form.answers[currentPage].answer.value as unknown as ScaleChoiceAnswer;
            }
            return null;
        },
        target: $currentValue,
    });

    sample({
        clock: [$scaleForm, formPageChanged],
        source: {
            form: $scaleForm,
            page: $currentPage,
        },
        fn: ({ form: { answers }, page }, pages) => {
            const currentPage = (isNumber(pages) ? pages : page) - 1;
            if (!answers[currentPage]?.answer) return null;

            if (answers && answers[currentPage].answer && isArray(answers[currentPage].answer)) {
                return answers[currentPage].answer as unknown as MultiChoiceAnswer;
            }

            if (answers && answers.length > 0 && answers[currentPage].isSingle) {
                return answers[currentPage].answer as unknown as SingleChoiceAnswer;
            }

            if (answers && answers.length > 0 && 'value' in answers[currentPage].answer) {
                return answers[currentPage].answer.value as unknown as ScaleChoiceAnswer;
            }

            return null;
        },
        target: $currentValue,
    });

    sample({
        clock: formPageChanged,
        fn: (page) => {
            window.scrollTo(0, 0);
            return page;
        },
        target: $currentPage,
    });

    sample({
        clock: $scaleForm,
        source: { questions: $questions, form: $scaleForm },
        fn: ({ questions, form: { answers } }) => getProgress(answers.length, questions.length),
        target: $currentProgress,
    });

    return {
        setSplashScreenVisibility,
        $scaleForm,
        $currentPage,
        $currentProgress,
        formReset,
        $currentQuestion,
        formPageChanged,
        $currentValue,
        directionChanged,
        $isSplashScreenVisible,
        scaleFormFieldChanged,
        $questions,
        TestGate,
    };
});
