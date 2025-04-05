import { useStoreMap, useUnit } from 'effector-react';

import { TYPE_TO_COLOR_MAP } from '@/shared/lib';

import { getFullReportQuery, ReportModel, ReportNavigationTemplate } from '@/entities/Report';

export const FullReportNavigation = () => {
    const [page, onPageChange] = useUnit([
        ReportModel.$currentContentPage,
        ReportModel.currentPageChanged,
        ReportModel.$currentPage,
    ]);
    const content = useStoreMap({
        store: getFullReportQuery.$data,
        keys: ['title', page],
        fn: (content) => content?.content?.map(({ title }) => title),
    });

    const mbti = useUnit(getFullReportQuery.$data.map((el) => el?.mbti_type));
    const color = TYPE_TO_COLOR_MAP[mbti];

    if (!content) return null;

    return (
        <ReportNavigationTemplate
            page={page}
            color={color}
            content={content}
            title={content[page]}
            onPageChange={onPageChange}
        />
    );
};
