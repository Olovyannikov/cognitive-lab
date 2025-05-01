import { sample } from 'effector';

import { createPageInit } from '@/shared/lib';

import { ReportModel } from '@/entities/Report';

const pageInitiated = createPageInit();

sample({
    clock: pageInitiated,
    fn: ({ routeParams }) => routeParams.reportId,
    target: ReportModel.$currentReportId,
});
