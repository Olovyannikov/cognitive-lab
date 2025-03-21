import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { getQuestionsQuery } from '@/entities/Test';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getQuestionsQuery.start,
});
