import { sample } from 'effector';

import { getBlogPostsQuery } from '@/entities/Blog';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getBlogPostsQuery.start,
});
