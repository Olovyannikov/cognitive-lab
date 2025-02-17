import { sample } from 'effector';

import { getFAQQuery } from '@/entities/FAQ';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getFAQQuery.start,
});
