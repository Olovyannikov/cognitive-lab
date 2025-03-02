import type { PropsWithChildren, ReactNode } from 'react';
import { Box, Container, Title } from '@mantine/core';
import clsx from 'clsx';

import s from './Section.module.css';

interface SectionProps {
    title?: ReactNode;
    filledText?: string;
    className?: string;
    containerClassName?: string;
}

export const Section = ({
    children,
    filledText,
    title,
    className,
    containerClassName,
}: PropsWithChildren<SectionProps>) => {
    return (
        <Box className={clsx(s.box, className)} component='section'>
            <Container className={containerClassName}>
                <Title className={s.title} order={2}>
                    {title}
                    <span>{filledText}</span>
                </Title>
                {children}
            </Container>
        </Box>
    );
};
