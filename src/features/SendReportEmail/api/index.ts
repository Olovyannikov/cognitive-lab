import { createMutation } from '@farfetched/core';

import { API, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

export const sendFreeReportOnEmailMutation = createMutation({
    effect: createInternalRequestFx<{ email: string }, void>((body) => ({
        url: API.SEND_FREE_EMAIL,
        method: HTTP_METHODS.POST,
        body,
    })),
});
