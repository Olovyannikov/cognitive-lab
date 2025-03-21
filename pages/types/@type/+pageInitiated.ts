import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { getPersonalityTypeQuery } from '@/entities/Report';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.type,
    target: getPersonalityTypeQuery.start,
});
