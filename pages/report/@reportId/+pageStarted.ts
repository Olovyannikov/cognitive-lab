import { sample } from 'effector';

import { createPageStart } from '@/shared/lib/effector';

import { getFullReportQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ({ id: ctx.routeParams.reportId }),
    target: getFullReportQuery.start,
});
