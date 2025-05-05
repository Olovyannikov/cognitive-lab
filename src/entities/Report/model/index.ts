import { createEffect, createEvent, createStore, sample, split } from 'effector';
import { createAction } from 'effector-action';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { isUndefined } from 'lodash-es';
import { combineEvents } from 'patronum';
import { navigate } from 'vike/client/router';

import { atom } from '@/shared/factories';
import { is404Error } from '@/shared/lib';

import { getFreeResultQuery, getFullReportQuery, getSurveysInfoQuery } from '../api';
import { $currentContentPage, $currentPage, $isFirstPage, $isLastPage } from './content';
import { $userOrder, $userOrderStatus } from './order';
import { $reportContent } from './reportContent';
import {
    $allUserReports,
    $expressUserReports,
    $freeUserReports,
    $isUserHasFreeReport,
    $lastUserFreeReport,
    $paidUserReports,
} from './userReports';

export const ReportModel = atom(() => {
    const ReportGate = createGate();
    const FreeReportGate = createGate();

    const reportIdReceived = createEvent<string>();
    const $currentReportId = createStore<string | null>(null);

    sample({
        clock: reportIdReceived,
        target: $currentReportId,
    });

    const redirectToMainPageFx = createEffect(async () => await navigate('/'));

    sample({
        clock: getFreeResultQuery.finished.success,
        filter: ({ result }) => !result,
        target: redirectToMainPageFx,
    });

    sample({
        clock: [combineEvents([ReportGate.open, FreeReportGate.open]), $currentReportId],
        fn: () => ({}),
        target: getSurveysInfoQuery.refresh,
    });

    const ReportPageGate = createGate();
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

    const currentPageChanged = createEvent<number>();

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

    const $userMbtiTypes = createStore<Record<string, string>[]>([]);

    sample({
        clock: getSurveysInfoQuery.finished.success,
        filter: (data) => !isUndefined(data.result),
        fn: ({ result }) =>
            result?.reports.map((report) => ({
                [report.user_report]: report.mbti_type,
            })) ?? [],
        target: $userMbtiTypes,
    });

    const currentResultReceived = createEvent<{ id: string; isFreeReport: boolean }>();

    sample({
        clock: $currentReportId,
        filter: (id) => id !== null,
        fn: (id) => {
            const isFreeReport = window?.location.pathname.includes('/free-report/');
            if (!id) return { id: '', isFreeReport };
            return { id, isFreeReport };
        },
        target: currentResultReceived,
    });

    split({
        source: currentResultReceived,
        match: (data) => (data.isFreeReport ? 'free' : 'paid'),
        cases: {
            free: getFreeResultQuery.refresh,
            paid: getFullReportQuery.refresh,
        },
    });

    const redirectTo404Fx = createEffect(async () => {
        await navigate('/error/404');
    });

    sample({
        clock: getFreeResultQuery.finished.failure,
        filter: is404Error,
        target: redirectTo404Fx,
    });

    return {
        ReportGate,
        $isUserHasFreeReport,
        $lastUserFreeReport,
        $allUserReports,
        $freeUserReports,
        $paidUserReports,
        $expressUserReports,
        $reportContent,
        $userOrder,
        $userOrderStatus,
        $isFirstPage,
        $isLastPage,
        $currentContentPage,
        currentPageChanged,
        $userMbtiTypes,
        ReportPageGate,
        $currentPage,
        FreeReportGate,
        reportIdReceived,
        $currentReportId,
    };
});
