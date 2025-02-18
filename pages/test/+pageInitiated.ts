import { sample } from 'effector';

import { getQuestionsQuery } from '@/entities/Test';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getQuestionsQuery.start,
});
