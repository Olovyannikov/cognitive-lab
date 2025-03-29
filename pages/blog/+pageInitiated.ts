import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { BlogModel, getBlogPostsQuery } from '@/entities/Blog';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: (ctx) => {
        const isMobile = ctx.isMobile;

        const ctxPage = ctx.urlParsed.search;
        let page = 1;
        let page_size = isMobile ? 5 : 10;

        if (ctxPage.page_size) {
            page_size = Number(ctxPage.page_size);
        }

        if (ctxPage.page) {
            page = Number(ctxPage.page);
        }

        return {
            page,
            page_size,
        };
    },
    target: getBlogPostsQuery.start,
});

sample({
    clock: pageInitiated,
    fn: (ctx) => {
        if (ctx.isMobile) {
            return 5;
        }

        return 10;
    },
    target: BlogModel.$pageSize,
});

sample({
    clock: getBlogPostsQuery.finished.failure,
    target: BlogModel.redirectToMainBlogPostPageFx,
});
