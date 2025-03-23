import { createMutation, createQuery } from '@farfetched/core';
import { PageContextServer } from 'vike/types';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { CreateReviewRequest, ReviewRequest, ReviewResponse } from './dto';

export const getReviewsQuery = createQuery({
    effect: createCommonRequestFx<ReviewRequest | PageContextServer<void> | void, ReviewResponse>((params) => ({
        url: API.surveys.comments,
        params: params ?? {},
    })),
});

export const createReviewMutation = createMutation({
    effect: createInternalRequestFx<CreateReviewRequest, void>((body) => ({
        url: API.surveys.comments,
        method: HTTP_METHODS.POST,
        body,
    })),
});
