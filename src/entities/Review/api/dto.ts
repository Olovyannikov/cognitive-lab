import type { Review } from '../types';

export interface CreateReviewRequest
    extends Pick<
        Review,
        | 'name'
        | 'text'
        | 'informativeness_rate'
        | 'convenience_rate'
        | 'accuracy_rate'
        | 'recommendability_rate'
        | 'satisfaction_rate'
    > {
    user_report: string;
}

export interface ReviewRequest {
    page?: number;
    page_size?: number;
}

export interface ReviewResponse {
    total_count: number;
    total_pages: number;
    current_page: number;
    has_next_page: true;
    payload: Review[];
}
