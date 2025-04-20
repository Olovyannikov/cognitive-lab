import { createQuery } from '@farfetched/core';
import { PageContextServer } from 'vike/types';

import { API, createCommonRequestFx } from '@/shared/api';

import type { ReviewRequest, ReviewResponse } from './dto';

export const getReviewsQuery = createQuery({
    effect: createCommonRequestFx<ReviewRequest | PageContextServer<void> | void, ReviewResponse>((params) => ({
        url: API.surveys.comments,
        params: params ?? {},
    })),
});
