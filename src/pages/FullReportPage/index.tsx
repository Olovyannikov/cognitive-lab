import { Box, Container } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getFullReportQuery, ReportHeader, ReportModel } from '@/entities/Report';
import { PageLoader } from '@/shared/ui';
import { FullReportNavigation } from '@/widgets/FullReportNavigation';
import { FullReportSlice } from '@/widgets/FullReportSlice';
import { ReportPagination } from '@/widgets/ReportPagination';

export const FullReportPage = () => {
    const { data, pending, stale } = useUnit(getFullReportQuery);
    const [isFirstPage] = useUnit([ReportModel.$currentContentPage.map((page) => page === 0)]);
    const [currentPage] = useUnit([ReportModel.$currentContentPage]);

    if (stale || pending) return <PageLoader />;
    if (!data) return;

    return (
        <Box component='section'>
            <Container>
                {isFirstPage && <ReportHeader showPreheader type={data.mbti_type} name={data.title} />}
                <FullReportNavigation />
                <FullReportSlice page={currentPage} />
                <ReportPagination />
            </Container>
        </Box>
    );
};
