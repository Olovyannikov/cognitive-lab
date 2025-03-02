import type { ReactNode } from 'react';
import { Box, Image, Text, Title } from '@mantine/core';

import s from './Card.module.css';

interface CardProps {
    title: string;
    text: string;
    bg: ReactNode;
    image: string;
}

export const Card = ({ bg, text, image, title }: CardProps) => {
    return (
        <Box className={s.card}>
            <Box className={s.cardTop}>
                {bg}
                <Title order={4}>{title}</Title>
                <Image src={image} width={150} height={121} aria-hidden={true} alt='' />
            </Box>
            <Text className={s.description}>{text}</Text>
        </Box>
    );
};
