import { sample } from 'effector';

import { getFreeResultQuery } from '@/entities/Report';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

sample({
    clock: pageStarted,
    fn: () => undefined,
    target: getFreeResultQuery.start,
});
