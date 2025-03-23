import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getReviewsQuery, ReviewModel } from '@/entities/Review';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: () => undefined,
    target: getReviewsQuery.refresh,
});

sample({
    clock: getReviewsQuery.finished.success,
    fn: ({ result }) => ({
        page_size: result.total_count,
    }),
    target: getReviewsQuery.refresh,
});

sample({
    clock: getReviewsQuery.finished.success,
    fn: ({ result }) => result.payload,
    target: ReviewModel.$allReviews,
});
