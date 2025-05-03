import { createEvent, createStore, sample } from 'effector';
import { createEffect } from 'effector/effector.umd';
import { createAction } from 'effector-action';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { combineEvents, delay } from 'patronum';
import { navigate } from 'vike/client/router';

import { atom } from '@/shared/factories';
import { is404Error, noop } from '@/shared/lib';

import { getFreeResultQuery, getSurveysInfoQuery } from '../api';
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
    const $currentReportId = createStore<string | null>(null);

    const redirectToMainPageFx = createEffect(async () => await navigate('/'));

    sample({
        clock: getFreeResultQuery.finished.success,
        filter: ({ result }) => !result,
        target: redirectToMainPageFx,
    });

    sample({
        clock: delay(ReportGate.open, 500),
        source: getSurveysInfoQuery.$data,
        filter: (data) => data === null,
        fn: noop,
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
        fn: ({ result }) =>
            result?.reports.map((report) => ({
                [report.user_report]: report.mbti_type,
            })) ?? [],
        target: $userMbtiTypes,
    });

    sample({
        clock: combineEvents([FreeReportGate.open, getSurveysInfoQuery.finished.success]),
        source: { id: $currentReportId, isStale: getFreeResultQuery.$stale, data: getFreeResultQuery.$data },
        filter: ({ id, isStale, data }) =>
            data == null && isStale && id !== null && window.location.pathname.includes('free-report/'),
        fn: ({ id }) => {
            if (!id) return { id: '' };
            return { id };
        },
        target: getFreeResultQuery.start,
    });

    const redirectTo404 = createEffect(async () => {
        await navigate('/error/404');
    });

    sample({
        clock: getFreeResultQuery.finished.failure,
        filter: is404Error,
        target: redirectTo404,
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
        $currentReportId,
    };
});
