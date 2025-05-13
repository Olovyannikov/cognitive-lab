import type { PreparedAnswer } from '../api/types';

/**
 * Проверяет, валиден ли ответ пользователя для перехода к следующему вопросу
 */
export const isValidAnswer = (answer: PreparedAnswer | undefined | null): boolean => {
    if (!answer || answer.answer == null || JSON.stringify(answer.answer) === '{}') return false;
    if (typeof answer.answer === 'object' && 'value' in answer.answer) {
        return answer.answer.value !== null && answer.answer.value !== '';
    }
    if (Array.isArray(answer.answer)) {
        return answer.answer.length > 0;
    }

    return true;
};
