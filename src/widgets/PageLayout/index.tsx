import type { PropsWithChildren } from 'react';
import { Box, Container, Title } from '@mantine/core';

import s from './PageLayout.module.css';

interface PageLayoutProps {
    title: string;
}

export const PageLayout = ({ title, children }: PropsWithChildren<PageLayoutProps>) => {
    return (
        <Box component='section' pb={32}>
            <Container>
                <Title order={2} className={s.title}>
                    {title}
                </Title>
                {children}
            </Container>
        </Box>
    );
};
