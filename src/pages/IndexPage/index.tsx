import { Box, Container } from '@mantine/core';

import { About } from '@/pages/IndexPage/ui/About';

import { Hero } from './ui';

export const IndexPage = () => {
    return (
        <Box component='section'>
            <Container>
                <Hero />
                <About />
            </Container>
        </Box>
    );
};
