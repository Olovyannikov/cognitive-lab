import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { MainPageResponse } from './dto';

export const getMainPageInfoQuery = createQuery({
    effect: createCommonRequestFx<void, MainPageResponse>(() => ({
        url: API.surveys.mainPage,
    })),
    initialData: [] as MainPageResponse,
});
