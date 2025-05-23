import type { ReactNode } from 'react';
import { Paper, Stack, Text, Title } from '@mantine/core';

import { Picture } from '@/shared/ui';

import s from './Banner.module.css';

interface BannerProps {
    color?: string;
    actionSlot?: ReactNode;
    title?: string;
    description?: string;
    image?:
        | string
        | {
              src: string;
              extra: string;
          };
}

const BANNER_CONFIG = {
    title: 'Купить отчет без прохождения теста',
    description:
        'Узнайте свои сильные стороны и потенциал с нашим готовым отчетом по типу личности – доступно сразу после заказа!',
    image: {
        src: '/types/circles/ENTP',
        extra: '_2',
    },
};

export const Banner = ({
    color = 'violet',
    actionSlot,
    title = BANNER_CONFIG.title,
    description = BANNER_CONFIG.description,
    image = BANNER_CONFIG.image,
}: BannerProps) => (
    <Paper data-color={color} className={s.paper}>
        <Stack className={s.inner}>
            <Title order={3} className={s.title}>
                <Picture cdn className={s.emoji} src='/emoji/star' />
                {title}
            </Title>
            <Text className={s.description}>{description}</Text>
            <Picture
                className={s.image}
                aria-hidden
                src={typeof image !== 'string' ? image.src : image}
                extraPath={typeof image !== 'string' && 'extra' in image ? image.extra : ''}
                w={260}
                h={260}
            />
            {actionSlot}
        </Stack>
    </Paper>
);
