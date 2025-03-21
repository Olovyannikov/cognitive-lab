import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';
import { appService } from '@/shared/services/app';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personality';

export const pageInitiated = createPageInit();

sample({
    clock: [appService.appStarted, pageInitiated],
    target: getPersonalityTypesWithCategoriesQuery.start,
});
