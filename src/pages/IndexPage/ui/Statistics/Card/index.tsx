import { Paper, Text, Title } from '@mantine/core';

import s from './Card.module.css';

interface CardProps {
    title: string;
    text: string;
}

export const Card = ({ title, text }: CardProps) => {
    return (
        <Paper className={s.paper}>
            <Title className={s.paperTitle} order={3}>
                {title}
            </Title>
            <Text className={s.paperText}>{text}</Text>
        </Paper>
    );
};
