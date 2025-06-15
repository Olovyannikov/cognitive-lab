import { Carousel } from '@mantine/carousel';
import { Box, Container } from '@mantine/core';

import { CongratulationsProvider, FirstSlide, SecondSlide } from '@/widgets/CongratulationsSlider';

export const CongratulationsPage = () => (
    <Box component='section'>
        <Container py='lg'>
            <CongratulationsProvider>
                <FirstSlide />
                <SecondSlide />
                <Carousel.Slide>3 Hello!</Carousel.Slide>
            </CongratulationsProvider>
        </Container>
    </Box>
);
