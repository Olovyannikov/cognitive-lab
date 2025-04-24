import { getSurveysInfoQuery } from '../api';
import type { SurveysInfoResponse, UserReportInfo } from '../api/dto';

const filterUserReportsByKey = (response?: SurveysInfoResponse | null, key?: string) =>
    response?.reports?.filter((report) => report.report_kind === key) ?? [];

export const $isUserHasFreeReport = getSurveysInfoQuery.$data.map((user) =>
    Boolean(user?.reports?.find?.((report) => report.report_kind === 'free'))
);
export const $lastUserFreeReport = getSurveysInfoQuery.$data.map(
    (user) => user?.reports.find?.((el) => el.report_kind === 'free') ?? ({} as UserReportInfo)
);

export const $allUserReports = getSurveysInfoQuery.$data.map((el) => el?.reports ?? []);
export const $freeUserReports = getSurveysInfoQuery.$data.map((el) => filterUserReportsByKey(el, 'free'));
export const $paidUserReports = getSurveysInfoQuery.$data.map((el) => filterUserReportsByKey(el, 'paid'));
export const $expressUserReports = getSurveysInfoQuery.$data.map((el) => filterUserReportsByKey(el, 'express'));
