import { createEvent, createStore, sample } from 'effector';
import { isArray, isNumber } from 'lodash-es';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';

import { getQuestionsQuery } from '@/entities/Test';

import type { QuestionsResponse } from '../api/dto';
import type { Answers, MultiChoiceAnswer, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../api/types';

export const TestModel = atom(() => {
    const formReset = createEvent();

    const $currentPage = createStore(1).reset(formReset);
    const $currentProgress = createStore(0).reset(formReset);
    const $currentQuestion = createStore<QuestionsResponse | null>(null);
    const $currentValue = createStore<PreparedAnswer['answer'] | null>(null).reset(formReset);
    const $isSplashScreenVisible = createStore<boolean>(true);

    const directionChanged = createEvent<'forward' | 'backward'>();
    const $direction = createStore<'forward' | 'backward'>('forward').on(directionChanged, (_, dir) => dir);

    const $scaleForm = createStore<Answers>({
        answers: [],
    }).reset(formReset);

    const setSplashScreenVisibility = createEvent<boolean>();
    const scaleFormFieldChanged = createEvent<PreparedAnswer>();
    const formPageChanged = createEvent<number>();
    const delayedFormFieldChanged = delay(scaleFormFieldChanged, 250);

    sample({
        clock: setSplashScreenVisibility,
        target: $isSplashScreenVisible,
    });

    sample({
        clock: [$currentPage, getQuestionsQuery.$data],
        source: {
            page: $currentPage,
            questions: getQuestionsQuery.$data,
        },
        fn: ({ page, questions }) => {
            if (!questions) return null;
            return questions[page - 1];
        },
        target: $currentQuestion,
    });

    sample({
        clock: scaleFormFieldChanged,
        source: $scaleForm,
        fn: (form, field) => {
            form.answers[field.index] = field;
            return { ...form };
        },
        target: $scaleForm,
    });

    sample({
        clock: delayedFormFieldChanged,
        source: { page: $currentPage, progress: $currentProgress, direction: $direction },
        filter: (params, field) => !field.isMultiple && params.direction === 'forward',
        fn: ({ page, progress }, answer) =>
            (answer?.answer as SingleChoiceAnswer).value !== null &&
            (answer?.answer as SingleChoiceAnswer).value !== '' &&
            (answer?.answer as SingleChoiceAnswer).value !== undefined &&
            progress < 100
                ? page + 1
                : page,
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
        source: { questions: getQuestionsQuery.$data, form: $scaleForm },
        fn: ({ questions, form: { answers } }) =>
            Number(((answers.length / (questions?.length ?? 0)) * 100).toFixed(0)),
        target: $currentProgress,
    });

    return {
        $currentPage,
        $currentProgress,
        $currentQuestion,
        $currentValue,
        $scaleForm,
        scaleFormFieldChanged,
        formPageChanged,
        $isSplashScreenVisible,
        setSplashScreenVisibility,
        formReset,
        directionChanged,
    };
});
