import { createEffect, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { getBlogPostsQuery } from '@/entities/Blog';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

const redirectToMainBlogPostPageFx = createEffect(async () => {
    await navigate('/blog?page=1');
});

sample({
    clock: pageInitiated,
    fn: (ctx) => {
        const ctxPage = ctx.urlParsed.search;
        let page = 1;
        let page_size = 10;

        if (ctxPage.page_size && ctxPage.page) {
            page = Number(ctxPage.page);
            page_size = Number(ctxPage.page_size);
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
