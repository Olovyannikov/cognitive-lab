import type { ReactNode } from 'react';
import { Box, Text, Title } from '@mantine/core';

import { Picture } from '@/shared/ui/Picture';

import s from './Card.module.css';

interface CardProps {
    title: string;
    text: string;
    bg: ReactNode;
    image: `/${string}/${string}`;
}

export const Card = ({ bg, text, image, title }: CardProps) => {
    return (
        <Box className={s.card}>
            <Box className={s.cardTop}>
                {bg}
                <Title order={4}>{title}</Title>
                <Picture src={image} width={150} height={121} />
            </Box>
            <Text className={s.description}>{text}</Text>
        </Box>
    );
};
