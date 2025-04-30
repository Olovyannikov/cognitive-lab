import { sample } from 'effector';

import { createPageStart } from '@/shared/lib';

import { getRegularPriceQuery } from '@/entities/Report';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    target: getRegularPriceQuery.refresh,
});
