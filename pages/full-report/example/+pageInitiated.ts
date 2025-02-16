import { sample } from 'effector';

import { getReportStructureQuery } from '@/entities/Report';
import { createPageInit } from '@/shared/utils/effector';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    target: getReportStructureQuery.start,
});

getReportStructureQuery.$data.watch(console.log);
