import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx, HTTP_METHODS } from '@/shared/api';

import type { SendIssueRequest } from './dto';

export const sendIssueMutation = createQuery({
    effect: createCommonRequestFx<SendIssueRequest, { id: string }>((body) => ({
        url: API.SEND_REPORT,
        method: HTTP_METHODS.POST,
        body,
    })),
});
