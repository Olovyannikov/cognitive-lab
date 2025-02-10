import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { PersonalityResponse, PersonalityTypesResponse } from './dto';

export const getPersonalityTypesWithCategoriesQuery = createQuery({
    effect: createCommonRequestFx<void, PersonalityTypesResponse[]>(() => ({
        url: API.PERSONALITY_TYPES,
    })),
    initialData: [],
});

export const getPersonalityTypeQuery = createQuery({
    effect: createCommonRequestFx<string, PersonalityResponse>((type) => ({
        url: API.PERSONALITY_TYPE(type),
    })),
});
