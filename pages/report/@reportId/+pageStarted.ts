import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { getFullReportQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: ({ routeParams: { reportId: id } }) => ({ id }),
    target: getFullReportQuery.start,
});
