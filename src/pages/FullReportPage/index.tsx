import { Box, Container } from '@mantine/core';
import { useStoreMap, useUnit } from 'effector-react';

import { CategoryBanner, getFullReportQuery, ReportHeader, ReportModel } from '@/entities/Report';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { PageLoader } from '@/shared/ui';
import { FullReportNavigation } from '@/widgets/FullReportNavigation';
import { FullReportSlice } from '@/widgets/FullReportSlice';
import { ReportPagination } from '@/widgets/ReportPagination';

export const FullReportPage = () => {
    const { data, pending, stale } = useUnit(getFullReportQuery);
    const [isFirstPage, page] = useUnit([
        ReportModel.$currentContentPage.map((page) => page === 0),
        ReportModel.$currentContentPage,
    ]);

    const titleMap = useStoreMap({
        store: getFullReportQuery.$data,
        keys: ['title', page],
        fn: (content) => content?.content?.map(({ title }) => title),
    });

    if (stale || pending) return <PageLoader />;
    if (!data) return;

    return (
        <Box component='section'>
            <Container>
                {isFirstPage && <ReportHeader showPreheader type={data.mbti_type} name={data.title} />}
                {!isFirstPage && <CategoryBanner title={titleMap[page]} color={TYPE_TO_COLOR_MAP[data.mbti_type]} />}
                <FullReportNavigation />
                <FullReportSlice page={page} />
                <ReportPagination />
            </Container>
        </Box>
    );
};
