import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { ReportModel } from '@/entities/Report';

export const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: (ctx) => ctx.routeParams.reportId,
    target: ReportModel.$currentFullReportId,
});
