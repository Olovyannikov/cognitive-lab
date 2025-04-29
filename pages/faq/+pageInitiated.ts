import { sample } from 'effector';

import { noop } from '@/shared/lib';
import { createPageInit } from '@/shared/lib/effector';

import { getFAQQuery } from '@/entities/FAQ';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: noop,
    target: getFAQQuery.refresh,
});
