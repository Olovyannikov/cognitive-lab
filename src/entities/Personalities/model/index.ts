import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personalities';

export const PersonalitiesInitialGate = createGate();

sample({
    clock: PersonalitiesInitialGate.open,
    target: getPersonalityTypesWithCategoriesQuery.refresh,
});

const $personalitiesMap = createStore<Record<string, string>>({});

sample({
    clock: getPersonalityTypesWithCategoriesQuery.$data,
    fn: (data) => {
        return (
            data
                .map((types) => types.types)
                .flat()
                .reduce(
                    (acc, curr) => {
                        acc[curr.code] = curr.name;

                        return acc;
                    },
                    {} as Record<string, string>
                ) ?? ({} as Record<string, string>)
        );
    },
    target: $personalitiesMap,
});

export const PersonalitiesModel = {
    $personalitiesMap,
};
