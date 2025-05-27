import { createStore, sample } from 'effector';

import { getFullReportQuery } from '../api';

export const $currentContentPage = createStore(0);
export const $currentPage = createStore(1);
export const $isFirstPage = $currentPage.map((page) => page - 1 <= 0);
export const $isLastPage = createStore<boolean>(false);

sample({
    clock: $currentPage,
    source: getFullReportQuery.$data,
    fn: (content, page) => page >= content.content?.map((el) => el.content)?.length,
    target: $isLastPage,
});
