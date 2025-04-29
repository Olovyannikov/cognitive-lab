import { useStoreMap, useUnit } from 'effector-react';

import { getFreeResultQuery, ReportModel, ReportNavigationTemplate, TYPE_TO_COLOR_MAP } from '@/entities/Report';

export const FreeReportNavigation = () => {
    const [page, onPageChange] = useUnit([ReportModel.$currentContentPage, ReportModel.currentPageChanged]);
    const content = useStoreMap({
        store: getFreeResultQuery.$data,
        keys: ['title', page],
        fn: (content) => content?.content?.map(({ title }) => title),
    });

    const activeMenu = content?.[page];

    const mbti = useUnit(getFreeResultQuery.$data.map((el) => el?.mbti_type));
    const color = TYPE_TO_COLOR_MAP[mbti ?? ''];

    if (!content) return;

    return (
        <ReportNavigationTemplate activeMenu={activeMenu} color={color} content={content} onPageChange={onPageChange} />
    );
};
