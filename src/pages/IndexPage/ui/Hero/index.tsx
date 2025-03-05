import { Box, Container, Image, Text, Title } from '@mantine/core';
import clsx from 'clsx';

import UnionImage from '@/app/assets/images/union.svg?react';
import { RainbowButton } from '@/shared/ui';

import s from './Hero.module.css';

export const Hero = () => {
    return (
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
                <Image draggable={false} className={s.image} src='/images/main-hero-char.png' />
                <RainbowButton href='/test'>Пройти тест</RainbowButton>
            </Container>
        </Box>
    );
};
