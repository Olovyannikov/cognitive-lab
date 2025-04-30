import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';
import { noop } from '@/shared/lib';

import { getSurveysInfoQuery } from '../api';
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
    };
});
