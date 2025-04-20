import { type ReactNode, useRef } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';

import s from './HowItHelpsCard.module.css';

interface CardProps {
    title: string;
    text: string;
    bg: ReactNode;
    i: number;
}

export const HowItHelpsCard = ({ i, title, bg, text }: CardProps) => {
    const container = useRef<HTMLDivElement>(null);

    return (
        <Box ref={container} className={s.wrapper}>
            <motion.div
                className={s.card}
                style={{
                    top: `calc(${i * 90}px)`,
                }}
            >
                {bg}
                <Title order={4}>{title}</Title>
                <Text>{text}</Text>
            </motion.div>
        </Box>
    );
};
