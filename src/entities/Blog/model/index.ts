import { createEffect, createEvent, createStore, restore, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { getBlogPostsQuery } from '@/entities/Blog';

const $currentPage = createStore(1);
const pageChanged = createEvent<number>();

const $pageSize = createStore(10);
const $totalPages = restore(
    getBlogPostsQuery.finished.success.map((res) => res.result.total_pages),
    1
);

const redirectToMainBlogPostPageFx = createEffect(async () => {
    await navigate('/blog?page=1');
});

sample({
    clock: pageChanged,
    target: $currentPage,
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

export const BlogModel = {
    $currentPage,
    $pageSize,
    pageChanged,
    $totalPages,
};
