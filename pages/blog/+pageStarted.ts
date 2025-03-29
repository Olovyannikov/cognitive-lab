// import { persist } from 'effector-storage/query';

import { createPageStart } from '@/shared/lib';

// import { BlogModel } from '@/entities/Blog';

export const pageStarted = createPageStart();

// TODO: оставляем персист или удаляем совсем?
// persist({
//     key: 'page_size',
//     pickup: pageStarted,
//     store: BlogModel.$pageSize,
//     deserialize: (pageSize) => Number(pageSize),
// });
// persist({
//     key: 'page',
//     pickup: pageStarted,
//     store: BlogModel.$currentPage,
//     deserialize: (page) => Number(page),
// });
