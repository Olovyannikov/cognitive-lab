import { List, type ListProps, Text } from '@mantine/core';

import type { ListItem } from '../../types';

import s from './FilledBulletList.module.css';

interface FilledBulletListProps extends ListProps {
    items?: ListItem[];
}

export const FilledBulletList = ({ items, ...props }: FilledBulletListProps) => (
    <List data-type='Filled Bullet List' classNames={s} {...props}>
        {items?.map((item) => (
            <List.Item hidden={!item.text && !item.title} key={`${item.type}_${item.title}`} mb='md'>
                <Text lh='21px' className={s.text} span={item.text?.startsWith(' — ') || item.title?.endsWith(': ')}>
                    {item.title}
                </Text>
                <Text className={s.text} span c='dark.7' lh='21px'>
                    {item.text}
                </Text>
            </List.Item>
        ))}
    </List>
);
