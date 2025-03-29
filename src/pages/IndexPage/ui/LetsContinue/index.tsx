import { Box, Center, Container, Title } from '@mantine/core';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { RainbowButton } from '@/shared/ui';

import s from './LetsContinue.module.css';

export const LetsContinue = () => (
    <Box component='section' className={s.root}>
        <Container>
            <Center className={s.logo}>
                <CognitiveLogo />
            </Center>
            <Title className={s.title} order={2}>
                Готовы узнать ваш <span>тип личности?</span>
            </Title>
            <RainbowButton
                mb={0}
                classNames={{
                    root: s.button,
                }}
            >
                Пройти тест
            </RainbowButton>
        </Container>
    </Box>
);
