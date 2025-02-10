import { Flex, Menu, Paper, Stack, Text, Title } from '@mantine/core';

import { type Personality, titleColorMap } from '@/entities/Personalities';

import s from './MenuItem.module.css';

interface MenuItemProps {
    category: string;
    description: string;
    types: Personality[];
    onClose: VoidFunction;
}

export const MenuItem = ({ types, category, description, onClose }: MenuItemProps) => {
    return (
        <Menu.Item className={s.item} component='div'>
            <Title mb='xs' fz={20} order={3}>
                {category}
            </Title>
            <Text mb='xl' fz={18}>
                {description}
            </Text>
            <Flex className={s.items} gap='md'>
                {types.map((type) => (
                    <Paper
                        py='md'
                        px={32}
                        radius='md'
                        component='a'
                        key={type.code}
                        onClick={onClose}
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
        </Menu.Item>
    );
};
