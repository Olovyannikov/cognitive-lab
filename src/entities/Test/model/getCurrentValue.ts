import { isArray, isNumber } from 'lodash-es';

import type { MultiChoiceAnswer, PreparedAnswer, ScaleChoiceAnswer, SingleChoiceAnswer } from '../api/types';

/**
 * Возвращает значение текущего ответа для страницы (индекса)
 * @param answers Массив ответов
 * @param page Текущий номер страницы (1-based)
 */
export const getCurrentValue = (
    answers: PreparedAnswer[],
    page: number | undefined
): MultiChoiceAnswer[] | SingleChoiceAnswer | ScaleChoiceAnswer | null => {
    if (!isNumber(page) || !answers?.length) return null;
    const currentPage = page - 1;
    const answer = answers[currentPage]?.answer;
    if (!answer) return null;

    if (isArray(answer)) {
        return answer as MultiChoiceAnswer[];
    }
    if (typeof answer === 'object' && 'value' in answer && !Array.isArray(answer)) {
        return answer as SingleChoiceAnswer;
    }
    return null;
};
