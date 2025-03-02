import type { ReactNode } from 'react';
import { Box, Text, Title } from '@mantine/core';

import s from './Card.module.css';

interface CardProps {
    title: string;
    text: string;
    bg: ReactNode;
}

export const Card = ({ title, bg, text }: CardProps) => {
    return (
        <Box className={s.card}>
            {bg}
            <Title order={4}>{title}</Title>
            <Text>{text}</Text>
        </Box>
    );
};
