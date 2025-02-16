import { Box, Button, Text } from '@mantine/core';
import clsx from 'clsx';

import UnionImage from '@/app/assets/images/union.svg?react';

import s from './Hero.module.css';

export const Hero = () => {
    return (
        <Box component='section' className={s.box}>
            <Text className={clsx(s.text, s.test)}>Тест на тип личности</Text>
            <Text className={s.text}>
                и выбор профессии с{' '}
                <span className={s.ai}>
                    AI <UnionImage />
                </span>
            </Text>
            <Text className={s.description}>
                С использованием искусственного интеллекта и научно-обоснованной методики MBTI, мы предоставляем
                персонализированные рекомендации для вашего карьерного роста и личностного развития.
            </Text>
            <Button size='xl' bg='dark.9' radius='md' className={s.shadow}>
                Пройти тест
            </Button>
        </Box>
    );
};
