import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { getFreeResultQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: ({ routeParams }) => ({
        id: routeParams.reportId,
    }),
    target: getFreeResultQuery.refresh,
});
