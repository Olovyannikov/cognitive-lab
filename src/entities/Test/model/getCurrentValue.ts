import { isArray, isNumber } from 'lodash-es';

import type { Answers, MultiChoiceAnswer, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../api/types';

/**
 * Возвращает значение текущего ответа для страницы (индекса)
 * @param answers Массив ответов
 * @param page Текущий номер страницы (1-based)
 * @param pages Все страницы
 */
export const getCurrentValue = (
    answers: PreparedAnswer[],
    page: number,
    pages: number | Answers
): MultiChoiceAnswer[] | SingleChoiceAnswer | ScaleChoiceAnswer | null => {
    const currentPage = (isNumber(pages) ? pages : page) - 1;
    const current = answers[currentPage];
    if (!current?.answer) return null;
    if (isArray(current.answer)) {
        return current.answer as unknown as MultiChoiceAnswer;
    }
    if (current.isSingle) {
        return current.answer as unknown as SingleChoiceAnswer;
    }
    if ('value' in current.answer) {
        return current.answer.value as unknown as ScaleChoiceAnswer;
    }
    return null;
};
