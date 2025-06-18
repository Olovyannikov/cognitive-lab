import { Box, Container } from '@mantine/core';
import { useUnit } from 'effector-react';

import { PageLoader } from '@/shared/ui';

import { getFreeResultQuery } from '@/entities/Report';

import { CongratulationsProvider, FirstSlide, LastSlide, SecondSlide } from '@/widgets/CongratulationsSlider';

export const CongratulationsPage = () => {
    const { pending, stale } = useUnit(getFreeResultQuery);

    if (stale || pending) return <PageLoader />;

    return (
        <Box component='section'>
            <Container py='lg'>
                <CongratulationsProvider>
                    <FirstSlide />
                    <SecondSlide />
                    <LastSlide />
                </CongratulationsProvider>
            </Container>
        </Box>
    );
};
