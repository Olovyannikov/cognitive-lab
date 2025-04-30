import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { ReviewModel } from '@/entities/Review';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: ({ routeParams }) => routeParams.userReport,
    target: ReviewModel.$currentReviewId,
});
