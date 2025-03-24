import { Paper, Stack, Title } from '@mantine/core';

import s from './OrderedCards.module.css';

interface OrderedCardProps {
    color: string;
    items: {
        text?: string;
        highlight?: null;
        title?: string;
        order?: number;
    }[];
}
export const OrderedCards = ({ items, color }: OrderedCardProps) => (
    <Stack>
        {items.map((item) => (
            <Paper className={s.paper} bg={color === 'positive' ? 'green.0' : 'pink.0'} key={item.order}>
                <Stack className={s.stack}>
                    <Title className={s.title} c={color === 'positive' ? 'green.9' : 'pink.9'} order={5}>
                        {item.order}. {item.title}
                    </Title>
                </Stack>
            </Paper>
        ))}
    </Stack>
);
