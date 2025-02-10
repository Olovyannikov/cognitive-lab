import { sample } from 'effector';

import { getPersonalityTypeQuery } from '@/entities/Personalities';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.type,
    target: getPersonalityTypeQuery.start,
});
