import { Carousel } from '@mantine/carousel';
import { Box, Container } from '@mantine/core';

import { CongratulationsProvider, FirstSlide } from '@/widgets/CongratulationsSlider';

export const CongratulationsPage = () => (
    <Box component='section'>
        <Container mb={24}>
            <CongratulationsProvider>
                <FirstSlide />
                <Carousel.Slide>2 Hello!</Carousel.Slide>
                <Carousel.Slide>3 Hello!</Carousel.Slide>
            </CongratulationsProvider>
        </Container>
    </Box>
);
