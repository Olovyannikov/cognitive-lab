import { sample } from 'effector';

import { getFullReportQuery } from '@/entities/Report';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ({ id: ctx.routeParams.reportId }),
    target: getFullReportQuery.start,
});
