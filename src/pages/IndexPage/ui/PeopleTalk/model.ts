import { createEvent, createStore, sample } from 'effector';

import { atom } from '@/shared/factories';

import type { Review } from '@/entities/Review';

export const PeopleTalkModel = atom(() => {
    const $currentReview = createStore<null | Review>(null);
    const currentReviewSettled = createEvent<Review>();
    sample({
        clock: currentReviewSettled,
        fn: (review) => ({
            ...review,
            created_at: review.created_at.includes('.')
                ? review.created_at
                : new Date(review.created_at).toLocaleDateString(),
        }),
        target: $currentReview,
    });

    const $isCarouselActive = createStore<boolean>(true);
    const carouselActiveStateSettled = createEvent<boolean>();
    sample({
        clock: carouselActiveStateSettled,
        target: $isCarouselActive,
    });

    const $isModalOpened = createStore<boolean>(false);
    const modalActiveStateSettled = createEvent<boolean>();
    sample({
        clock: modalActiveStateSettled,
        target: $isModalOpened,
    });

    return {
        $currentReview,
        currentReviewSettled,
        $isCarouselActive,
        carouselActiveStateSettled,
        $isModalOpened,
        modalActiveStateSettled,
    };
});
