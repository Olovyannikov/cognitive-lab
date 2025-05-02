import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getAllBlogPostsQuery } from '@/entities/Blog';
import { getFAQQuery } from '@/entities/FAQ';
import { getMainPageInfoQuery } from '@/entities/Landing';
import { getReviewsQuery, ReviewModel } from '@/entities/Review';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getMainPageInfoQuery.refresh,
});

sample({
    clock: pageInitiated,
    fn: () => ({
        page: 1,
        page_size: 100,
    }),
    target: getReviewsQuery.refresh,
});

sample({
    clock: pageInitiated,
    fn: () => ({
        page_size: 100,
    }),
    target: getAllBlogPostsQuery.refresh,
});

sample({
    clock: pageInitiated,
    fn: () => ({
        show_on_main: true,
    }),
    target: getFAQQuery.refresh,
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
