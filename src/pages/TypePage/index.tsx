import { Box, Container } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getPersonalityTypeQuery } from '@/entities/Personalities';
import { ReportHeader } from '@/entities/Report';
import { InnerContainer } from '@/shared/ui';

export const TypePage = () => {
    const { data } = useUnit(getPersonalityTypeQuery);

    if (!data) return null;

    return (
        <Box component='section'>
            <Container>
                <ReportHeader type={data.mbti_type} name={data.title} />

                <InnerContainer>{/*<ShowFullReportStructure />*/}</InnerContainer>
                <Box pb={80}>{/*<ContentResolver showTitle={false} showPurchaseBanner />*/}</Box>
            </Container>
        </Box>
    );
};
