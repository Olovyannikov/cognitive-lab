import { Box, Button, Center, Container, Title } from '@mantine/core';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

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
                <Button variant='rainbow' mb={0} href='/test' component='a'>
                    Пройти тест
                </Button>
            </Center>
        </Container>
    </Box>
);
