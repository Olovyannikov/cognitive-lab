import { cache, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { BlogPostByIdRequest, BlogPostsRequest, BlogPostsResponse } from './dto';

export const getBlogPostsQuery = createQuery({
    initialData: {} as BlogPostsResponse,
    effect: createCommonRequestFx<BlogPostsRequest, BlogPostsResponse>((params) => ({
        url: API.blog.posts,
        params: {
            post_type: 'post',
            page_size: Number(params.page_size),
            ...params,
        },
    })),
    mapData: (data) => {
        if (!data.result) return {} as BlogPostsResponse;
        const payload = data.result?.payload?.toSorted((a, b) => Number(b.pinned) - Number(a.pinned));

        return {
            ...data.result,
            payload: payload,
        };
    },
});

export const getAllBlogPostsQuery = createQuery({
    initialData: {} as BlogPostsResponse,
    effect: createCommonRequestFx<BlogPostsRequest, BlogPostsResponse>((params) => ({
        url: API.blog.posts,
        params: {
            post_type: 'post',
            page_size: Number(params.page_size),
            show_on_main: true,
            ...params,
        },
    })),
    mapData: (data) => {
        if (!data.result) return {} as BlogPostsResponse;
        const payload = data.result?.payload
            .toSorted((a, b) => Number(b.pinned) - Number(a.pinned))
            .map((data) => ({
                ...data,
                updated_at: new Date(data.updated_at).toLocaleDateString('ru-RU'),
            }));

        return {
            ...data.result,
            payload,
        };
    },
});

export const getBlogPostByIdQuery = createQuery({
    effect: createCommonRequestFx<string, BlogPostByIdRequest>((id) => ({
        url: API.blog.postById(id),
    })),
});

cache(getBlogPostsQuery);
