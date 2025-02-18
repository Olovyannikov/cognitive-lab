import { persist } from 'effector-storage/local';

import { TestModel } from '@/entities/Test';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

persist({
    store: TestModel.$currentPage,
    pickup: pageStarted,
});

persist({
    store: TestModel.$scaleForm,
    pickup: pageStarted,
});

persist({
    store: TestModel.$currentProgress,
    pickup: pageStarted,
});
