import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getAllBlogPostsQuery } from '@/entities/Blog';
import { getReviewsQuery, ReviewModel } from '@/entities/Review';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: () => undefined,
    target: [getReviewsQuery.refresh],
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
    fn: ({ result }) =>
        result.payload.map((data) => ({
            ...data,
            created_at: new Date(data.created_at).toLocaleDateString('ru-RU'),
        })),
    target: ReviewModel.$allReviews,
});

sample({
    clock: pageInitiated,
    fn: () => ({
        page_size: 100,
    }),
    target: getAllBlogPostsQuery.refresh,
});
