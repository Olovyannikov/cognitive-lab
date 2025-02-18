import type { PropsWithChildren } from 'react';
import { Box, Container } from '@mantine/core';

import s from './TestContainer.module.css';

export const TestContainer = ({ children }: PropsWithChildren) => (
    <Box component='section'>
        <Container className={s.container}>{children}</Container>
    </Box>
);
