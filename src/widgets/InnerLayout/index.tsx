import type { PropsWithChildren, ReactNode } from 'react';
import { Box, Container, Stack, Text, Title } from '@mantine/core';

import { InnerContainer, Picture } from '@/shared/ui';

import s from './InnerLayout.module.css';

interface InnerLayoutProps {
    image?: string;
    text?: ReactNode;
    title?: ReactNode;
    navigateTo?: string;
    backButtonText?: string;
}

export const InnerLayout = ({ text, title, image, children }: PropsWithChildren<InnerLayoutProps>) => (
    <Box component='section'>
        <Container pb={80}>
            <InnerContainer className={s.wrapper}>
                <Picture src={image} w={140} h={140} flex='auto' />
                <Stack w='100%'>
                    <Title order={2} className={s.title} hidden={!title}>
                        {title}
                    </Title>
                    <Text className={s.text} hidden={!text}>
                        {text}
                    </Text>
                    {children}
                </Stack>
            </InnerContainer>
        </Container>
    </Box>
);
