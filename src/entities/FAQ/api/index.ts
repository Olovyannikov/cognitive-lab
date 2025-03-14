import { cache, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { FaqItemResponse } from './dto';

export const getFAQQuery = createQuery({
    effect: createCommonRequestFx<void, FaqItemResponse>(() => ({
        url: API.FAQ_LIST,
        params: {
            post_type: 'faq',
        },
    })),
    initialData: {} as FaqItemResponse,
});

cache(getFAQQuery);
