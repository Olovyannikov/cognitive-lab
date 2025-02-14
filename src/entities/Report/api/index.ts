import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { ReportResult } from './dto.ts';

export const getPersonalityTypeQuery = createQuery({
    effect: createCommonRequestFx<string, ReportResult>((type) => ({
        url: API.PERSONALITY_TYPE(type),
    })),
    initialData: {} as ReportResult,
});
