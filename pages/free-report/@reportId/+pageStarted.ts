import { sample } from 'effector';

import { createPageStart } from '@/shared/lib/effector';

import { getFreeResultQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ({
        id: ctx.routeParams.reportId,
    }),
    target: getFreeResultQuery.start,
});
