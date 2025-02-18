import { sample } from 'effector';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: (ctx) => {
        return {
            id: ctx.urlParsed.search.order_id,
        };
    },
    target: getSurveysInfoQuery.start,
});

sample({
    clock: getSurveysInfoQuery.finished.success,
    fn: ({ params, result }) => {
        return result.user_orders.find((el) => el.id === params.id) ?? null;
    },
    target: ReportModel.$userOrder,
});
