import { Box, Container, Text, Title } from '@mantine/core';
import clsx from 'clsx';

import UnionImage from '@/app/assets/images/union.svg?react';

import { Picture, RainbowButton } from '@/shared/ui';

import s from './Hero.module.css';

export const Hero = () => (
    <Box component='section'>
        <Container className={s.box}>
            <Title className={clsx(s.text, s.title)}>Тест на тип личности</Title>
            <Text className={clsx(s.text, s.subtitle)}>
                и выбор профессии <br />
                <span>
                    с&nbsp;
                    <span className={s.ai}>
                        AI <UnionImage />
                    </span>
                </span>
            </Text>
            <Text className={s.description}>
                Узнайте свой тип личности и получите персональные советы для вашего развития
            </Text>
            <Picture className={s.image} src='/landing/main-hero-char' />
            <RainbowButton href='/test'>Пройти тест</RainbowButton>
        </Container>
    </Box>
);
