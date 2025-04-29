import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { BlogModel, getBlogPostsQuery } from '@/entities/Blog';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ isMobile, urlParsed: { search } }) => {
        let page = 1;
        let page_size = isMobile ? 5 : 10;

        if (search.page_size) page_size = Number(search.page_size);
        if (search.page) page = Number(search.page);

        return {
            page,
            page_size,
        };
    },
    target: getBlogPostsQuery.start,
});

sample({
    clock: pageInitiated,
    fn: ({ isMobile }) => (isMobile ? 5 : 10),
    target: BlogModel.$pageSize,
});

sample({
    clock: getBlogPostsQuery.finished.failure,
    target: BlogModel.redirectToMainBlogPostPageFx,
});
