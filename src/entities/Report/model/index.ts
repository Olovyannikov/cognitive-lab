import { createEvent, createStore, sample } from 'effector';
import { createAction } from 'effector-action';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/query';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';

import { getFullReportQuery, getPersonalityTypeQuery, getSurveysInfoQuery } from '../api';
import type { UserReportInfo } from '../api/dto';
import type { ContentBlock, ContentResult, Order } from '../types';

export const ReportModel = atom(() => {
    const ReportGate = createGate();
    const ReportPageGate = createGate();

    const $userOrder = createStore<Order | null>(null);
    const $userOrderStatus = $userOrder?.map((order) => order?.status ?? 'pending');

    const $currentContentPage = createStore(0);
    const $currentPage = createStore(1);
    const currentPageChanged = createEvent<number>();

    const $isUserHasFreeReport = getSurveysInfoQuery.$data.map((user) =>
        Boolean(user?.reports?.find?.((report) => report.report_kind === 'free'))
    );
    const $lastUserFreeReport = getSurveysInfoQuery.$data.map(
        (user) => user?.reports?.findLast?.((el) => el.report_kind === 'free') ?? ({} as UserReportInfo)
    );

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

    const $reportContent = createStore<{ title: string; content: ContentBlock[] }[]>([]);
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
        clock: getPersonalityTypeQuery.finished.success,
        fn: ({ result }) => result.content,
        target: $reportContent,
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

    sample({
        clock: delay(ReportGate.open, 500),
        source: getSurveysInfoQuery.$data,
        filter: (data) => data === null,
        fn: () => {},
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
        $isUserHasFreeReport,
        $lastUserFreeReport,
        $reportContent,
        $userMbtiTypes,
    };
});
