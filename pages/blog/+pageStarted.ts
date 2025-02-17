import { persist } from 'effector-storage/query';

import { BlogModel } from '@/entities/Blog';
import { createPageStart } from '@/shared/utils/effector';

export const pageStarted = createPageStart();

persist({
    key: 'page_size',
    pickup: pageStarted,
    store: BlogModel.$pageSize,
    deserialize: (pageSize) => Number(pageSize),
});
persist({
    key: 'page',
    pickup: pageStarted,
    store: BlogModel.$currentPage,
    deserialize: (page) => Number(page),
});
