import { Grid, Paper, Stack, Text, Title } from '@mantine/core';

import type { ListItem } from '../../types';

interface CardsProps {
    items: ListItem[];
    color?: string;
}

export const Cards = ({ items, color }: CardsProps) => (
    <Grid grow>
        {items.map((item, index) => (
            <Grid.Col key={index} span={6}>
                <Paper h='100%' radius={30} px='3xl' py={22} bg={`${color}.0`}>
                    <Stack gap='xs'>
                        <Title c={`${color}.9`} fz={24} order={4}>
                            {item.title}
                        </Title>
                        <Text fz={20}>{item.text}</Text>
                    </Stack>
                </Paper>
            </Grid.Col>
        ))}
    </Grid>
);
