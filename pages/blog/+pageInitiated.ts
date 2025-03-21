import { createEffect, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { createPageInit } from '@/shared/lib/effector';

import { getBlogPostsQuery } from '@/entities/Blog';

export const pageInitiated = createPageInit();

const redirectToMainBlogPostPageFx = createEffect(async () => {
    await navigate('/blog?page=1');
});

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
    clock: getBlogPostsQuery.finished.failure,
    target: redirectToMainBlogPostPageFx,
});
