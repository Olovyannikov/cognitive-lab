import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';

import { getFullReportQuery, getPersonalityTypeQuery, getSurveysInfoQuery } from '../api';
import type { ContentBlock } from '../types';

export const $currentContentPage = createStore(0);
export const $currentPage = createStore(1);
export const currentPageChanged = createEvent<number>();
export const $isFirstPage = $currentPage.map((page) => page - 1 <= 0);
export const $isLastPage = createStore<boolean>(false);

export const $reportContent = createStore<{ title: string; content: ContentBlock[] }[]>([]);
export const $userMbtiTypes = createStore<Record<string, string>[]>([]);

sample({
    clock: getPersonalityTypeQuery.finished.success,
    fn: ({ result }) => result.content,
    target: $reportContent,
});

sample({
    clock: getSurveysInfoQuery.finished.success,
    fn: ({ result }) =>
        result?.reports.map((report) => ({
            [report.user_report]: report.mbti_type,
        })) ?? [],
    target: $userMbtiTypes,
});

sample({
    clock: $currentPage,
    source: getFullReportQuery.$data,
    fn: (content, page) => page >= content.content?.map((el) => el.content)?.length,
    target: $isLastPage,
});

createAction({
    clock: currentPageChanged,
    target: {
        $currentContentPage,
        $currentPage,
    },
    fn: (target, clock) => {
        target.$currentPage(clock);
        target.$currentContentPage(clock - 1);
    },
});
