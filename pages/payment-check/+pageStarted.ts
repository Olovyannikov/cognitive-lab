import { sample } from 'effector';
import { isObject } from 'lodash-es';

import { createPageStart } from '@/shared/utils';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ({
        id: ctx.urlParsed.search.order_id,
    }),
    target: getSurveysInfoQuery.refresh,
});

sample({
    clock: getSurveysInfoQuery.finished.success,
    fn: ({ params, result }) =>
        result.user_orders.find((el) => {
            if (isObject(params)) {
                return el.id === params.id;
            }
        }) ?? null,
    target: ReportModel.$userOrder,
});
