import { createEffect, sample } from 'effector';
import { delay } from 'patronum';
import { navigate } from 'vike/client/router';

import { createPageStart } from '@/shared/lib';

import { getFreeResultQuery, ReportModel } from '@/entities/Report';

export const pageStarted = createPageStart();

const redirectToMainPageFx = createEffect(async () => {
    await navigate('/');
});

sample({
    clock: pageStarted,
    fn: ({ routeParams }) => routeParams.reportId,
    target: ReportModel.$currentReportId,
});

sample({
    clock: delay(pageStarted, 200),
    fn: ({ routeParams }) => ({
        id: routeParams.reportId,
    }),
    target: getFreeResultQuery.start,
});

sample({
    clock: delay(getFreeResultQuery.finished.success, 200),
    filter: ({ result }) => !result,
    target: redirectToMainPageFx,
});
