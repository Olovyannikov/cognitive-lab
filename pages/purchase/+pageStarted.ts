import { sample } from 'effector';

import { getRegularPriceQuery } from '@/entities/Report';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    target: getRegularPriceQuery.refresh,
});
