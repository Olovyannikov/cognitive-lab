import { cache, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { BlogPostByIdRequest, BlogPostsRequest, BlogPostsResponse } from './dto';

export const getBlogPostsQuery = createQuery({
    initialData: {} as BlogPostsResponse,
    effect: createCommonRequestFx<BlogPostsRequest, BlogPostsResponse>((params) => ({
        url: API.BLOG_POSTS,
        params: {
            post_type: 'post',
            page_size: Number(params.page_size),
            ...params,
        },
    })),
    mapData: (data) => {
        if (!data.result) return {} as BlogPostsResponse;
        const payload = data.result?.payload.toSorted((a, b) => Number(b.pinned) - Number(a.pinned));

        return {
            ...data.result,
            payload: payload,
        };
    },
});

export const getBlogPostByIdQuery = createQuery({
    effect: createCommonRequestFx<string, BlogPostByIdRequest>((id) => ({
        url: API.BLOG_POST_BY_ID(id),
    })),
});

cache(getBlogPostsQuery);
