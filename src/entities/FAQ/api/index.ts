import { cache, createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { FaqItemResponse, FaqRequest } from './dto';

export const getFAQQuery = createQuery({
    effect: createCommonRequestFx<FaqRequest | void, FaqItemResponse>((params) => ({
        url: API.faq.list,
        params: {
            post_type: 'faq',
            ...params,
        },
    })),
    initialData: {} as FaqItemResponse,
});

cache(getFAQQuery);
