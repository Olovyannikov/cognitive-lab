import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getMainPageInfoQuery } from '@/entities/Landing';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getMainPageInfoQuery.refresh,
});
