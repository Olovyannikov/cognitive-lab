import { createEffect, createEvent, createStore, restore, sample } from 'effector';
import { createAction } from 'effector-action';
import { navigate } from 'vike/client/router';

import { getBlogPostsQuery } from '@/entities/Blog';
import { atom } from '@/shared/factories';
import { desktop, mobile } from '@/shared/media';

export const BlogModel = atom(() => {
    const $currentPage = createStore(1);
    const pageChanged = createEvent<number>();

    const $pageSize = createStore(5);

    const $totalPages = restore(
        getBlogPostsQuery.finished.success.map((res) => res.result.total_pages),
        1
    );

    const redirectToMainBlogPostPageFx = createEffect(async () => {
        await navigate('/blog?page=1');
    });

    createAction({
        clock: [desktop.matched, mobile.matched],
        source: {
            isDesktop: desktop.$matches,
            isMobile: mobile.$matches,
        },
        target: {
            $currentPage,
            $pageSize,
        },
        fn: (target, { isDesktop, isMobile }) => {
            target.$currentPage(1);
            if (isDesktop) {
                target.$pageSize(10);
            }
            if (isMobile) {
                target.$pageSize(5);
            }
        },
    });

    sample({
        clock: pageChanged,
        target: $currentPage,
    });

    sample({
        clock: $pageSize,
        fn: (pageSize) => ({ page: 1, page_size: pageSize }),
        target: getBlogPostsQuery.refresh,
    });

    sample({
        clock: $currentPage,
        source: {
            page_size: $pageSize,
        },
        fn: ({ page_size }, page) => ({ page, page_size }),
        target: getBlogPostsQuery.refresh,
    });

    sample({
        clock: getBlogPostsQuery.finished.failure,
        target: redirectToMainBlogPostPageFx,
    });

    return {
        $currentPage,
        $pageSize,
        pageChanged,
        $totalPages,
    };
});
