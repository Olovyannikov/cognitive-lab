import { sample } from 'effector';

import { ReviewModel } from '@/entities/Review';

import { createPageInit } from '../../../src/shared/lib';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: (ctx) => ctx.routeParams.userReport,
    target: ReviewModel.$currentReviewId,
});
