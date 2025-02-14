import { sample } from 'effector';

import { getPersonalityTypeQuery } from '@/entities/Report';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.type,
    target: getPersonalityTypeQuery.start,
});
