import { sample } from 'effector';

import { createPageInit } from '@/shared/lib/effector';

import { getReportStructureQuery } from '@/entities/Report';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getReportStructureQuery.start,
});
