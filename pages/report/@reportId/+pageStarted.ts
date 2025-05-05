import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { ReportModel } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ctx.routeParams.reportId,
    target: ReportModel.reportIdReceived,
});
