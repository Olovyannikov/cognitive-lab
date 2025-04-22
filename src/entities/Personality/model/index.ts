import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import { atom } from '@/shared/factories';

import { getPersonalityTypesWithCategoriesQuery } from '../api';
import { normalizePersonalities } from '../lib';

export const PersonalitiesModel = atom(() => {
    const PersonalitiesInitialGate = createGate();
    const $personalitiesMap = createStore<Record<string, string>>({});

    sample({
        clock: PersonalitiesInitialGate.open,
        target: getPersonalityTypesWithCategoriesQuery.refresh,
    });

    sample({
        clock: getPersonalityTypesWithCategoriesQuery.$data,
        fn: normalizePersonalities,
        target: $personalitiesMap,
    });

    return {
        $personalitiesMap,
        PersonalitiesInitialGate,
    };
});
