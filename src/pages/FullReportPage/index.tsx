import { Box, Container } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getFullReportQuery, ReportHeader, ReportModel } from '@/entities/Report';
import { PageLoader } from '@/shared/ui';
import { FullReportSlice } from '@/widgets/FullReportSlice';
import { ReportNavigation } from '@/widgets/ReportNavigation';

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
                <ReportNavigation />
                <FullReportSlice page={currentPage} />
            </Container>
        </Box>
    );
};
