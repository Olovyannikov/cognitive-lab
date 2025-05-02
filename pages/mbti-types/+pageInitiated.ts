import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personality';

const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getPersonalityTypesWithCategoriesQuery.refresh,
});
