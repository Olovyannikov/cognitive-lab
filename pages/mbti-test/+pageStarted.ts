import { persist } from 'effector-storage/local';

import { createPageStart } from '@/shared/lib';

import { TestModel } from '@/entities/Test';

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
