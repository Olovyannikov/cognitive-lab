import { Paper, Text, Title } from '@mantine/core';

import s from './StatisticsCard.module.css';

interface CardProps {
    title: string;
    text: string;
}

export const StatisticsCard = ({ title, text }: CardProps) => (
    <Paper className={s.paper}>
        <Title className={s.paperTitle} order={3}>
            {title}
        </Title>
        <Text className={s.paperText}>{text}</Text>
    </Paper>
);
