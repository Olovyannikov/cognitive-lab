import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { getBlogPostByIdQuery } from '@/entities/Blog';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.id,
    target: getBlogPostByIdQuery.start,
});
