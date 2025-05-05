import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { ReportModel } from '@/entities/Report';

export const pageInitiated = createPageStart();

sample({
    clock: pageInitiated,
    fn: (ctx) => ctx.routeParams.reportId,
    target: ReportModel.$currentFreeReportId,
});
