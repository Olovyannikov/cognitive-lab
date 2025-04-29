import { createEffect, createEvent, createStore, restore, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { atom } from '@/shared/factories';

import { getBlogPostsQuery } from '../api';
import type { BlogPost } from '../types';

export const BlogModel = atom(() => {
    const $pageSize = createStore(5);

    const $blogPosts = restore<BlogPost[]>(
        getBlogPostsQuery.finished.success.map(({ result }) => result.payload),
        []
    );

    const pageChanged = createEvent<number>();
    const $currentPage = restore(pageChanged, 1);

    const scrollToTopFx = createEffect(() => window.scrollTo(0, 0));

    sample({
        clock: pageChanged,
        target: scrollToTopFx,
    });

    sample({
        clock: $pageSize,
        filter: getBlogPostsQuery.$data.map((el) => el?.payload?.length < 1),
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

    const $totalPages = restore(
        getBlogPostsQuery.finished.success.map((res) => res.result.total_pages),
        1
    );

    const redirectToMainBlogPostPageFx = createEffect(async () => {
        await navigate('/blog');
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
        redirectToMainBlogPostPageFx,
        $blogPosts,
    };
});
