import { createStore, sample } from 'effector';

import { getPersonalityTypeQuery } from '../api';
import type { ContentBlock } from '../types';

export const $reportContent = createStore<{ title: string; content: ContentBlock[] }[]>([]);
sample({
    clock: getPersonalityTypeQuery.finished.success,
    fn: ({ result }) => result.content,
    target: $reportContent,
});
