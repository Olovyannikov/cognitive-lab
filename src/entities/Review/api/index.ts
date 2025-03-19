import { createMutation, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { CreateReviewRequest, ReviewRequest, ReviewResponse } from './dto';

export const getReviewsQuery = createQuery({
    effect: createCommonRequestFx<ReviewRequest, ReviewResponse>((params) => ({
        url: API.REVIEWS_LIST,
        params,
    })),
});

export const createReviewMutation = createMutation({
    effect: createInternalRequestFx<CreateReviewRequest, void>((body) => ({
        url: API.REVIEWS_LIST,
        method: HTTP_METHODS.POST,
        body,
    })),
});
