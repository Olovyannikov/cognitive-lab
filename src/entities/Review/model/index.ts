import { createStore, sample } from 'effector';

import { atom } from '@/shared/factories';

import { getReviewsQuery } from '@/entities/Review';

export interface Review {
    id: string;
    mbti_type: string;
    name: string;
    text: string;
    informativeness_rate: number;
    convenience_rate: number;
    accuracy_rate: number;
    recommendability_rate: number;
    satisfaction_rate: number;
    overall_rate: number;
    created_at: string;
}

export const ReviewModel = atom(() => {
    const $allReviews = createStore<Review[]>([]);

    sample({
        clock: getReviewsQuery.finished.success,
        fn: ({ result }) => ({
            page_size: result.total_count,
        }),
        target: getReviewsQuery.refresh,
    });

    sample({
        clock: getReviewsQuery.finished.success,
        fn: ({ result }) =>
            result.payload.map((data) => ({
                ...data,
                created_at: new Date(data.created_at).toLocaleDateString('ru-RU'),
            })),
        target: ReviewModel.$allReviews,
    });

    return {
        $allReviews,
    };
});
