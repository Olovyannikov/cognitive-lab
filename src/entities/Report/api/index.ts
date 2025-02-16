import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import { ContentResult } from '../types';
import type { ReportResult } from './dto.ts';

export const getPersonalityTypeQuery = createQuery({
    effect: createCommonRequestFx<string, ReportResult>((type) => ({
        url: API.PERSONALITY_TYPE(type),
    })),
    initialData: {} as ReportResult,
});

export const getReportStructureQuery = createQuery({
    effect: createCommonRequestFx<void, ContentResult['content']>(() => ({
        url: API.GET_STRUCTURE,
    })),
    initialData: [] as ContentResult['content'],
});
