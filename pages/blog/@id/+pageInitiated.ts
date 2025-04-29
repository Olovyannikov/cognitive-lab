import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getBlogPostByIdQuery } from '@/entities/Blog';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams: { id } }) => id,
    target: getBlogPostByIdQuery.start,
});
