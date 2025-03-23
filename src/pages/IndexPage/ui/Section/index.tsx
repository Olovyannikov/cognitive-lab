import type { PropsWithChildren, ReactNode, Ref } from 'react';
import { Box, Container, Title } from '@mantine/core';
import clsx from 'clsx';

import s from './Section.module.css';

interface SectionProps {
    title?: ReactNode;
    filledText?: string;
    className?: string;
    containerClassName?: string;
    ref?: Ref<HTMLDivElement>;
    id?: string;
    hidden?: boolean;
}

export const Section = ({
    children,
    filledText,
    title,
    className,
    containerClassName,
    ref,
    id,
    hidden = false,
}: PropsWithChildren<SectionProps>) => (
    <Box id={id} ref={ref} className={clsx(s.box, className)} component='section' hidden={hidden}>
        <Container className={containerClassName}>
            {(title || filledText) && (
                <Title className={s.title} order={2}>
                    {title}
                    <span>{filledText}</span>
                </Title>
            )}
            {children}
        </Container>
    </Box>
);
