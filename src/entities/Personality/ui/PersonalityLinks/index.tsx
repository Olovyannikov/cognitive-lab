import { Flex, Paper, Stack, Text } from '@mantine/core';

import { titleColorMap } from '../../constants';
import type { Personality } from '../../types';

import s from './PersonalityLinks.module.css';

interface PersonalityLinksProps {
    items: Personality[];
    category: string;
    onClick?: VoidFunction;
}

export const PersonalityLinks = ({ items, onClick, category }: PersonalityLinksProps) => (
    <Flex className={s.items} gap='md'>
        {items.map((type) => (
            <Paper
                py='md'
                px={32}
                radius='md'
                component='a'
                key={type.code}
                onClick={onClick}
                className={s.paper}
                href={`/types/${type.code}`}
                data-color={`${titleColorMap[category]}`}
            >
                <Stack gap='xs' align='center'>
                    <Text fw={500} fz={20}>
                        {type.name}
                    </Text>
                    <Text fz={16}>{type.code}</Text>
                </Stack>
            </Paper>
        ))}
    </Flex>
);
