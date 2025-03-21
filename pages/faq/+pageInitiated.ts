import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { getFAQQuery } from '@/entities/FAQ';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getFAQQuery.start,
});
