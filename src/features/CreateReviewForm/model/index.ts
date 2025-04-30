import { createStore, sample } from 'effector';

import { atom } from '@/shared/factories';
import { noop } from '@/shared/lib';

import { getSurveysInfoQuery, UserReportComment } from '@/entities/Report';
import { createReviewMutation, ReviewModel } from '@/entities/Review';

export const CreateReviewFormModel = atom(() => {
    const $isSubmitted = createStore(false);
    const $comments = createStore<UserReportComment[]>([]);

    sample({
        clock: getSurveysInfoQuery.finished.success,
        fn: ({ result }) => result?.left_comments ?? [],
        target: $comments,
    });

    sample({
        clock: $comments,
        source: ReviewModel.$currentReviewId,
        fn: (id, comments) => Boolean(comments?.filter(({ user_report }) => user_report === id).length),
        target: $isSubmitted,
    });

    sample({
        clock: createReviewMutation.finished.success,
        fn: noop,
        target: getSurveysInfoQuery.start,
    });

    return {
        $isSubmitted,
    };
});
