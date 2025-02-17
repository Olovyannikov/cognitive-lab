import { cache, createQuery } from '@farfetched/core';

import { createCommonRequestFx } from '@/shared/api';
import { API } from '@/shared/api';

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
