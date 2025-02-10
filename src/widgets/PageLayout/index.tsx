import type { PropsWithChildren } from 'react';
import { Box, Container, Title } from '@mantine/core';

interface PageLayoutProps {
    title: string;
}

export const PageLayout = ({ title, children }: PropsWithChildren<PageLayoutProps>) => {
    return (
        <Box component='section' mt={80} pb={32}>
            <Container>
                <Title order={2} fz={56} mb={32} ta='center'>
                    {title}
                </Title>
                {children}
            </Container>
        </Box>
    );
};
