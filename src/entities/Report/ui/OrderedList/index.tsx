import { List, Stack, Title } from '@mantine/core';

import type { ListItem } from '../../types';
import { contentResolver } from '../../utils';
import s from './OrderedList.module.css';

interface OrderedListProps {
    items: ListItem[];
    color?: string;
}

export const OrderedList = ({ items, color }: OrderedListProps) => {
    return (
        <List data-type='Ordered List' type='ordered' className={s.list} data-color={color}>
            {items?.map((item, index) => {
                return (
                    <List.Item key={index}>
                        <Title data-color={color} mb='md' className={s.title}>
                            {item.title}
                        </Title>
                        {item.content?.map((content, idx) => (
                            <Stack key={content.type + idx}>{contentResolver(content, color ?? 'violet')}</Stack>
                        ))}
                    </List.Item>
                );
            })}
        </List>
    );
};
