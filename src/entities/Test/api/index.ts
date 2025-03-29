import { createMutation, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { QuestionsResponse } from './dto';
import type { Answers } from './types';

export const getQuestionsQuery = createQuery({
    effect: createCommonRequestFx<void, QuestionsResponse[]>(() => ({
        url: `/surveys/questions`,
    })),
    // TODO: @test only multiple
    // mapData: ({ result }) => result.filter((el) => el.type === 'multiple_choice'),
    // TODO: @test only single
    // mapData: ({ result }) => result.filter((el) => el.type === 'single_choice'),
    // TODO: @test only scale
    // mapData: ({ result }) => result.filter((el) => el.type === 'scale'),
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
