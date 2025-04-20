import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getAllBlogPostsQuery } from '@/entities/Blog';
import { getFAQQuery } from '@/entities/FAQ';
import { getMainPageInfoQuery } from '@/entities/Landing';
import { getReviewsQuery } from '@/entities/Review';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: [getMainPageInfoQuery.refresh, getReviewsQuery.refresh],
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
