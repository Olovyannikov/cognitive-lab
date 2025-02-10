import { createQuery } from '@farfetched/core';

import { API, createCommonRequestFx } from '@/shared/api';

import type { PersonalityTypesResponse } from '../types';

export const getPersonalityTypesWithCategoriesQuery = createQuery({
    effect: createCommonRequestFx<void, PersonalityTypesResponse[]>(() => ({
        url: API.PERSONALITY_TYPES,
    })),
    initialData: [],
});
