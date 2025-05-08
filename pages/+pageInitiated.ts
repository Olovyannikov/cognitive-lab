import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';
import { appService } from '@/shared/services';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personality';

export const pageInitiated = createPageInit();

sample({
    clock: [appService.appStarted, pageInitiated],
    target: [getPersonalityTypesWithCategoriesQuery.refresh],
});
