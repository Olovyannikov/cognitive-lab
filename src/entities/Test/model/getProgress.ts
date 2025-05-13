/**
 * Вычисляет процент прогресса прохождения теста
 * @param answersCount Количество ответов
 * @param questionsCount Количество вопросов
 */
export const getProgress = (answersCount: number, questionsCount: number): number => {
    if (!questionsCount) return 0;
    return Number(((answersCount / questionsCount) * 100).toFixed(0));
};
