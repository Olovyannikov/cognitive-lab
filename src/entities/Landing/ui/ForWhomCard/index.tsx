import type { ReactNode } from 'react';
import { Box, Text, Title } from '@mantine/core';

import { Picture } from '@/shared/ui/Picture';

import s from './ForWhomCard.module.css';

interface CardProps {
    title: string;
    text: string;
    bg: ReactNode;
    image: `/${string}/${string}`;
}

export const ForWhomCard = ({ bg, text, image, title }: CardProps) => (
    <Box className={s.card}>
        <Box className={s.cardTop}>
            {bg}
            <Title order={4}>{title}</Title>
            <Picture src={image} w={150} h={121} />
        </Box>
        <Text className={s.description}>{text}</Text>
    </Box>
);
