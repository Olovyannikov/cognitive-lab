import { sample } from 'effector';
import { createGate } from 'effector-react';

import { getPersonalityTypesWithCategoriesQuery } from '@/entities/Personalities';

export const PersonalitiesInitialGate = createGate();

sample({
    clock: PersonalitiesInitialGate.open,
    target: getPersonalityTypesWithCategoriesQuery.refresh,
});
