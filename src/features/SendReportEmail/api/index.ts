import { createMutation } from '@farfetched/core';

import { API, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

export const sendFreeReportOnEmailMutation = createMutation({
    effect: createInternalRequestFx<{ email: string; user_report_id: string }, void>(({ user_report_id, ...body }) => ({
        url: API.surveys.email(user_report_id),
        method: HTTP_METHODS.POST,
        body,
    })),
});
