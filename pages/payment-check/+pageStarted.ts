import { sample } from 'effector';
import { isObject } from 'lodash-es';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { createPageStart } from '@/shared/utils';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => ({
        id: ctx.urlParsed.search.order_id,
    }),
    target: getSurveysInfoQuery.start,
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
