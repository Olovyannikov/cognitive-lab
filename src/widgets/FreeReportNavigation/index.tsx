import { useStoreMap, useUnit } from 'effector-react';

import { getFreeResultQuery, ReportModel, ReportNavigationTemplate } from '@/entities/Report';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';

export const FreeReportNavigation = () => {
    const [page, onPageChange] = useUnit([ReportModel.$currentContentPage, ReportModel.currentPageChanged]);
    const content = useStoreMap({
        store: getFreeResultQuery.$data,
        keys: ['title', page],
        fn: (content) => content?.content.map(({ title }) => title),
    });

    const mbti = useUnit(getFreeResultQuery.$data.map((el) => el.mbti_type));
    const color = TYPE_TO_COLOR_MAP[mbti];

    return <ReportNavigationTemplate color={color} page={page} content={content} onPageChange={onPageChange} />;
};
