import { createEvent, createStore, sample } from 'effector';
import { isArray, isNumber } from 'lodash-es';
import { delay } from 'patronum';

import { getQuestionsQuery } from '@/entities/Test';

import type { QuestionsResponse } from '../api/dto';
import type { Answers, MultiChoiceAnswer, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../types';

const $currentPage = createStore(1);
const $currentProgress = createStore(0);
const $currentQuestion = createStore<QuestionsResponse | null>(null);
const $currentValue = createStore<PreparedAnswer['answer'] | null>(null);

const $scaleForm = createStore<Answers>({
    answers: [],
});

const scaleFormFieldChanged = createEvent<PreparedAnswer>();
const formPageChanged = createEvent<number>();
const delayedFormFieldChanged = delay(scaleFormFieldChanged, 250);

const submitModalStateChanged = createEvent();

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
    source: $currentPage,
    filter: (_, field) => !(field.isMultiple || field.isSingle),
    fn: (page) => page + 1,
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
            if (form.answers[currentPage].answer.value) {
                return form.answers[currentPage].answer.value as unknown as ScaleChoiceAnswer;
            }
            return null;
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
    fn: ({ questions, form: { answers } }) => Number(((answers.length / (questions?.length ?? 0)) * 100).toFixed(0)),
    target: $currentProgress,
});

export const TestModel = {
    $currentPage,
    $currentProgress,
    $currentQuestion,
    $currentValue,
    $scaleForm,
    scaleFormFieldChanged,
    formPageChanged,
    submitModalStateChanged,
};
