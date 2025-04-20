import type { BlogPost } from '../types';

export interface BlogPostsResponse {
    payload: BlogPost[];
    current_page: number;
    has_next_page: boolean;
    total_count: number;
    total_pages: number;
}

export type BlogPostByIdRequest = BlogPost;

export interface BlogPostsRequest {
    page?: number;
    page_size?: number;
    show_on_main?: boolean;
}
