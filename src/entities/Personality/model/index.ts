import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import { atom } from '@/shared/factories';

import { getPersonalityTypesWithCategoriesQuery } from '../api';

export const PersonalitiesModel = atom(() => {
    const PersonalitiesInitialGate = createGate();
    const $personalitiesMap = createStore<Record<string, string>>({});

    sample({
        clock: PersonalitiesInitialGate.open,
        target: getPersonalityTypesWithCategoriesQuery.refresh,
    });

    sample({
        clock: getPersonalityTypesWithCategoriesQuery.$data,
        fn: (data) =>
            data
                .map((types) => types.types)
                .flat()
                .reduce(
                    (acc, curr) => {
                        acc[curr.code] = curr.name;

                        return acc;
                    },
                    {} as Record<string, string>
                ) ?? ({} as Record<string, string>),
        target: $personalitiesMap,
    });

    return {
        $personalitiesMap,
        PersonalitiesInitialGate,
    };
});
