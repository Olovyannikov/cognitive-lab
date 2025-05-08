import { createMutation } from '@farfetched/core';

import { API, createInternalRequestFx } from '@/shared/api';

export const subscribeToNewsMutation = createMutation({
    effect: createInternalRequestFx<{ email: string }, void>((body) => ({
        url: API.news.subscribe,
        method: 'POST',
        body,
    })),
});
