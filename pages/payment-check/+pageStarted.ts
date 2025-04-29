import { cache } from '@farfetched/core';
import { sample } from 'effector';
import { isObject } from 'lodash-es';

import { createPageStart } from '@/shared/lib';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: ({ urlParsed: { search } }) => ({
        id: search.order_id,
    }),
    target: getSurveysInfoQuery.refresh,
});

sample({
    clock: getSurveysInfoQuery.finished.success,
    source: ReportModel.$userOrder,
    filter: (data) => data === null,
    fn: (_, { params, result }) =>
        result?.user_orders.find((order) => {
            if (isObject(params)) return order.id === params.id;
        }) ?? null,
    target: ReportModel.$userOrder,
});

cache(getSurveysInfoQuery);
