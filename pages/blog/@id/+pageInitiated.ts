import { sample } from 'effector';

import { getBlogPostByIdQuery } from '@/entities/Blog';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.id,
    target: getBlogPostByIdQuery.start,
});
