import { List, Text, ThemeIcon } from '@mantine/core';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

import { useIsLarge } from '@/shared/hooks';

import type { ListItem } from '../../types';

import s from './IconList.module.css';

interface IconListProps {
    items: ListItem[];
    color?: string;
}

export const IconList = ({ items, color }: IconListProps) => {
    const isLarge = useIsLarge();

    return (
        <List classNames={s}>
            {items.map((item) => (
                <List.Item
                    icon={
                        <ThemeIcon color='transparent' c={`${color}.9`} size={isLarge ? 32 : 24}>
                            <CheckCircle size={isLarge ? 32 : 24} />
                        </ThemeIcon>
                    }
                    key={`${item.type}_${item.text}`}
                    mb='md'
                >
                    <Text fz={isLarge ? 22 : 18} lh='21px'>
                        {item.text}
                    </Text>
                </List.Item>
            ))}
        </List>
    );
};
