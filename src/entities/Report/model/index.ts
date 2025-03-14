import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';

import { getFullReportQuery, getSurveysInfoQuery } from '@/entities/Report';

import { ContentResult, Order } from '../types';

const $userOrder = createStore<Order | null>(null);
const $userOrderStatus = $userOrder.map((order) => order?.status);

const $currentContentPage = createStore(0);
const $currentPage = createStore(1);
const currentPageChanged = createEvent<number>();

const $currentContent = createStore<ContentResult>({} as ContentResult);

const $isFirstPage = $currentPage.map((page) => page - 1 <= 0);
const $isLastPage = createStore<boolean>(false);

const $allUserReports = getSurveysInfoQuery.$data.map((el) => el.reports);
const $freeUserReports = getSurveysInfoQuery.$data.map((el) =>
    el.reports?.filter((report) => report.report_kind === 'free')
);

sample({
    clock: $currentPage,
    source: getFullReportQuery.$data,
    fn: (content, page) => {
        return page >= content.content.map((el) => el.content).length;
    },
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

export const ReportModel = {
    $userOrder,
    $userOrderStatus,
    $currentContentPage,
    currentPageChanged,
    $currentContent,
    $isFirstPage,
    $isLastPage,
    $currentPage,
    $freeUserReports,
    $allUserReports,
};
