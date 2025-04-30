import { createEffect, sample } from 'effector';
import { navigate } from 'vike/client/router';

import { createPageStart } from '@/shared/lib';

import { getFreeResultQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

const redirectToMainPageFx = createEffect(async () => {
    await navigate('/');
});

sample({
    clock: pageStarted,
    fn: ({ routeParams }) => ({
        id: routeParams.reportId,
    }),
    target: getFreeResultQuery.start,
});

sample({
    clock: getFreeResultQuery.$data,
    filter: (data) => !data,
    target: redirectToMainPageFx,
});
