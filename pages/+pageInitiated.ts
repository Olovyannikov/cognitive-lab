import { sample } from 'effector';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personalities';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();
sample({
    clock: [pageInitiated],
    target: getPersonalityTypesWithCategoriesQuery.start,
});
