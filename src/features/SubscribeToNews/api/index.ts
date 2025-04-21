import { createMutation } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

export const subscribeToNewsMutation = createMutation({
    effect: createCommonRequestFx<{ email: string }, void>((body) => ({
        url: API.news.subscribe,
        method: 'POST',
        body,
    })),
});
