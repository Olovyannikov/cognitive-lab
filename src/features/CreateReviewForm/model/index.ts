import { createStore, sample } from 'effector';

import { atom } from '@/shared/factories';

import { getSurveysInfoQuery } from '@/entities/Report';
import { ReviewModel } from '@/entities/Review';

export const CreateReviewFormModel = atom(() => {
    const $isSubmitted = createStore(false);

    const $comments = getSurveysInfoQuery.$data.map((info) => info?.left_comments);

    sample({
        clock: $comments,
        source: ReviewModel.$currentReviewId,
        fn: (id, comments) => Boolean(comments?.find(({ user_report }) => user_report === id)),
        target: $isSubmitted,
    });

    return {
        $isSubmitted,
    };
});
