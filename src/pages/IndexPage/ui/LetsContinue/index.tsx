import { Box, Button, Center, Container, Title } from '@mantine/core';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { ROUTES } from '@/shared/config';

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
            <Center>
                <Button className='mantine-button-rainbow' href={ROUTES.TEST} component='a'>
                    Пройти тест
                </Button>
            </Center>
        </Container>
    </Box>
);
