import { createEffect, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { createPageStart } from '@/shared/lib';

import { getFreeResultQuery, ReportModel } from '@/entities/Report';

export const pageStarted = createPageStart();

const redirectToMainPageFx = createEffect(async () => await navigate('/'));

sample({
    clock: pageStarted,
    source: ReportModel.$currentReportId,
    fn: (id, ctx) => ({
        id: id ?? ctx.routeParams.reportId,
    }),
    target: getFreeResultQuery.start,
});

sample({
    clock: getFreeResultQuery.finished.success,
    filter: ({ result }) => !result,
    target: redirectToMainPageFx,
});
