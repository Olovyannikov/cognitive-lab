import type { BlogPost } from '../types';

export interface BlogPostsResponse {
    payload: BlogPost[];
}

export type BlogPostByIdRequest = BlogPost;
