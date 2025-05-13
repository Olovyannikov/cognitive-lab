import { createEvent, createStore, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';

import { getCurrentValue } from '@/entities/Test/model/getCurrentValue';
import { isValidAnswer } from '@/entities/Test/model/isValidAnswer';

import { getQuestionsQuery } from '../api';
import type { QuestionsResponse } from '../api/dto';
import type { Answers, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../api/types';
import { DELAY_MS } from './constants';
import { getProgress } from './getProgress';

/**
 * Модель теста, реализованная на Effector atom.
 * @returns {object} API для управления состоянием теста
 */
export const TestModel = atom(() => {
    /** Гейт для инициализации/размонтирования компонента теста */
    const TestGate = createGate();

    /** Событие сброса формы */
    const formReset = createEvent();
    /** Событие для управления видимостью сплэш-экрана */
    const setSplashScreenVisibility = createEvent<boolean>();

    /** Событие изменения поля шкалы */
    const scaleFormFieldChanged = createEvent<PreparedAnswer>();

    /**
     * Стор с ответами пользователя
     */
    const $scaleForm = createStore<Answers>({
        answers: [],
    })
        .reset(formReset)
        .on(scaleFormFieldChanged, (form, field) => {
            const updatedAnswers = [...form.answers];
            updatedAnswers[field.index] = field;
            return { ...form, answers: updatedAnswers };
        });

    /** Текущая страница теста */
    const $currentPage = createStore(1).reset(formReset);
    /** Текущий прогресс (в процентах) */
    const $currentProgress = createStore(0).reset(formReset);
    /** Текущий вопрос */
    const $currentQuestion = createStore<QuestionsResponse | null>(null);
    /** Текущее значение ответа */
    const $currentValue = createStore<PreparedAnswer['answer'] | null>(null).reset(formReset);
    /** Видимость сплэш-экрана */
    const $isSplashScreenVisible = createStore<boolean>(true).reset(formReset);

    /** Событие смены направления (вперед/назад) */
    const directionChanged = createEvent<'forward' | 'backward'>();
    /** Стор направления */
    const $direction = createStore<'forward' | 'backward'>('forward').on(directionChanged, (_, dir) => dir);

    /** Событие смены страницы формы */
    const formPageChanged = createEvent<number>();

    /** Задержка для события изменения поля */
    const delayedFormFieldChanged = delay(scaleFormFieldChanged, DELAY_MS);

    /** Стор с вопросами */
    const $questions = restore(
        getQuestionsQuery.finished.success.map((el) => el.result),
        []
    );

    // --- Реактивные связи ---

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

    // --- Логика перехода вперед по шкале ---
    sample({
        clock: delayedFormFieldChanged,
        source: { page: $currentPage, progress: $currentProgress, direction: $direction, form: $scaleForm },
        filter: (params, field) => !field.isMultiple && params.direction === 'forward',
        fn: ({ page, progress, form }, answer) => {
            const currentAnswer = form.answers[page - 1];

            if (!isValidAnswer(currentAnswer)) return page;
            const singleValue = (answer?.answer as SingleChoiceAnswer).value;

            if (answer.showInput || !singleValue) return page;
            const isValidSingle = singleValue !== '' && singleValue !== undefined;

            if (isValidSingle && progress < 100) {
                return page + 1;
            }
            return page;
        },
        target: formPageChanged,
    });

    // --- Получение значения для шкалы (не single/multi) ---
    sample({
        clock: scaleFormFieldChanged,
        source: {
            form: $scaleForm,
            page: $currentPage,
        },
        filter: (_, field) => !(field.isMultiple || field.isSingle),
        fn: ({ form, page }) => {
            const currentPage = page - 1;
            const current = form.answers[currentPage];
            if (form.answers && form.answers.length > 0 && current && 'value' in current.answer) {
                if (!current.answer.value) return null;
                return current.answer.value as unknown as ScaleChoiceAnswer;
            }
            return null;
        },
        target: $currentValue,
    });

    // --- Получение значения для текущего ответа (single/multi/scale) ---
    sample({
        clock: [$scaleForm, formPageChanged],
        source: {
            form: $scaleForm,
            page: $currentPage,
        },
        fn: ({ form: { answers }, page }, pages) => getCurrentValue(answers, page, pages),
        target: $currentValue,
    });

    // --- Смена страницы и скролл вверх ---
    sample({
        clock: formPageChanged,
        fn: (page) => {
            window.scrollTo(0, 0);
            return page;
        },
        target: $currentPage,
    });

    // --- Обновление прогресса ---
    sample({
        clock: $scaleForm,
        source: { questions: $questions, form: $scaleForm },
        fn: ({ questions, form: { answers } }) => getProgress(answers.length, questions.length),
        target: $currentProgress,
    });

    /**
     * API модели теста
     */
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
