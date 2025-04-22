import { sample } from 'effector';
import { createGate } from 'effector-react';
import { delay } from 'patronum';

import { atom } from '@/shared/factories';
import { noop } from '@/shared/lib';

import { getSurveysInfoQuery } from '../api';
import type { UserReportInfo } from '../api/dto';

export const ReportModel = atom(() => {
    const ReportGate = createGate();
    sample({
        clock: delay(ReportGate.open, 500),
        source: getSurveysInfoQuery.$data,
        filter: (data) => data === null,
        fn: noop,
        target: getSurveysInfoQuery.refresh,
    });

    const $isUserHasFreeReport = getSurveysInfoQuery.$data.map((user) =>
        Boolean(user?.reports?.find?.((report) => report.report_kind === 'free'))
    );
    const $lastUserFreeReport = getSurveysInfoQuery.$data.map(
        (user) => user?.reports.find?.((el) => el.report_kind === 'free') ?? ({} as UserReportInfo)
    );

    return {
        ReportGate,
        $isUserHasFreeReport,
        $lastUserFreeReport,
    };
});
