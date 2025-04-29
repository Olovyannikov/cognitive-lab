import { ReactNode } from 'react';
import { List, Stack, Title } from '@mantine/core';

import type { ContentResolverProps, ListItem } from '../../types';

import s from './OrderedList.module.css';

interface OrderedListProps {
    items: ListItem[];
    color?: string;
    resolver: (p: ContentResolverProps) => ReactNode;
}

export const OrderedList = ({ items, color, resolver }: OrderedListProps) => (
    <List data-type='Ordered List' type='ordered' className={s.list} data-color={color}>
        {items?.map((item, index) => (
            <List.Item key={index}>
                <Title data-color={color} mb='md' className={s.title}>
                    {item.title}
                </Title>
                {item.content?.map((content, idx) => (
                    <Stack key={content.type + idx}>{resolver({ content, color: color ?? 'violet' })}</Stack>
                ))}
            </List.Item>
        ))}
    </List>
);
