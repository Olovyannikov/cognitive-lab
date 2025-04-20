import { createStore } from 'effector';

import { atom } from '@/shared/factories';

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
    return {
        $allReviews,
    };
});
