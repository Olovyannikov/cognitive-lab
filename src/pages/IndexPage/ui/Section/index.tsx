import type { PropsWithChildren, ReactNode, Ref } from 'react';
import { Box, type BoxProps, Container, Title } from '@mantine/core';
import clsx from 'clsx';

import s from './Section.module.css';

interface SectionProps extends BoxProps {
    title?: ReactNode;
    filledText?: string;
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
    ...props
}: PropsWithChildren<SectionProps>) => (
    <Box
        id={id}
        ref={ref}
        className={clsx(s.box, className)}
        pos='relative'
        component='section'
        hidden={hidden}
        {...props}
    >
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
