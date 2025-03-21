import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/query';
import { delay, not } from 'patronum';

import { atom } from '@/shared/factories';

import { getFullReportQuery, getSurveysInfoQuery } from '../api';
import type { ContentResult, Order } from '../types';

export const ReportModel = atom(() => {
    const ReportGate = createGate();
    const ReportPageGate = createGate();

    const $userOrder = createStore<Order | null>(null);
    const $userOrderStatus = $userOrder?.map((order) => order?.status ?? 'pending');

    const $currentContentPage = createStore(0);
    const $currentPage = createStore(1);
    const currentPageChanged = createEvent<number>();

    persist({
        store: $currentPage,
        pickup: ReportPageGate.open,
    });
    persist({
        store: $currentContentPage,
        pickup: ReportPageGate.open,
    });

    $currentContentPage.reset(ReportPageGate.close);
    $currentPage.reset(ReportPageGate.close);

    const $currentContent = createStore<ContentResult>({} as ContentResult);

    const $isFirstPage = $currentPage.map((page) => page - 1 <= 0);
    const $isLastPage = createStore<boolean>(false);

    const $allUserReports = getSurveysInfoQuery.$data.map((el) => el?.reports ?? []);
    const $freeUserReports = getSurveysInfoQuery.$data.map(
        (el) => el?.reports?.filter((report) => report.report_kind === 'free') ?? []
    );
    const $paidUserReports = getSurveysInfoQuery.$data.map(
        (el) => el?.reports?.filter((report) => report.report_kind === 'paid') ?? []
    );
    const $expressUserReports = getSurveysInfoQuery.$data.map(
        (el) => el?.reports?.filter((report) => report.report_kind === 'express') ?? []
    );

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

    sample({
        clock: delay(ReportGate.open, 500),
        filter: not(getSurveysInfoQuery.$data),
        fn: () => undefined,
        target: getSurveysInfoQuery.refresh,
    });

    return {
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
        $paidUserReports,
        $expressUserReports,
        ReportGate,
        ReportPageGate,
    };
});
