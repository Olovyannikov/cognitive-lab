import { createMutation, createQuery } from '@farfetched/core';
import { v4 } from 'uuid';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { QuestionsResponse } from './dto';
import type { Answers } from './types';

export const getQuestionsQuery = createQuery({
    effect: createCommonRequestFx<void, QuestionsResponse[]>(() => ({
        url: `/surveys/questions`,
    })),
    mapData: (data) => [
        ...data.result,
        {
            id: v4(),
            text: 'Ваш Email',
            type: 'email',
            category: '',
            reverse_scored: false,
            hint: 'Пришлем отчет и бонусные материалы',
        },
    ],
});

export const submitAnswersMutation = createMutation({
    effect: createInternalRequestFx<Answers, { id: string; user_free_report: string }>((body) => ({
        url: `/surveys/answers/submit`,
        method: HTTP_METHODS.POST,
        body,
    })),
});

export const takeTestAgainMutation = createQuery({
    effect: createInternalRequestFx<void, void>(() => ({
        url: API.surveys.start,
        method: HTTP_METHODS.POST,
    })),
});
