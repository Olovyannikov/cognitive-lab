import { sample } from 'effector';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personality';
import { appService } from '@/shared/services/app';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: [appService.appStarted, pageInitiated],
    target: getPersonalityTypesWithCategoriesQuery.start,
});
