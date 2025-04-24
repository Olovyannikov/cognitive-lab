import type { ComponentProps, CSSProperties } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { Check } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

import s from './PointsList.module.css';

interface PointsBlockProps extends ComponentProps<'div'> {
    points?: string[];
    position?: CSSProperties['position'];
    color?: string;
}

export const PointsList = ({ points, color = 'violet', ...props }: PointsBlockProps) => {
    if (!points || !points.length) return null;

    return (
        <Stack className={clsx(s.stack, props.className)}>
            {points.map((item, index) => (
                <Group className={s.point} key={`${item}_${index}`}>
                    <Check className={s.check} weight='bold' color={`var(--mantine-color-${color}-9)`} />
                    <Text className={s.text}>{item}</Text>
                </Group>
            ))}
        </Stack>
    );
};
