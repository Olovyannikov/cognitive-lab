import { createQuery } from '@farfetched/core';

import { API, createInternalRequestFx, HTTP_METHODS } from '@/shared/api';

import type { SendIssueRequest } from './dto';

export const sendIssueMutation = createQuery({
    effect: createInternalRequestFx<SendIssueRequest, { id: string }>((body) => ({
        url: API.support.issues,
        method: HTTP_METHODS.POST,
        body,
    })),
});
