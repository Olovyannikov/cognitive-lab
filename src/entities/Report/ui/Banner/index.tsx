import type { ReactNode } from 'react';
import { Image, Paper, Text, Title } from '@mantine/core';

import { InnerContainer } from '@/shared/ui';

import s from './Banner.module.css';

interface BannerProps {
    color?: string;
    actionSlot?: ReactNode;
    title?: string;
    description?: string;
}

const BANNER_CONFIG = {
    title: 'Купить отчет без прохождения теста',
    description:
        'Узнайте свои сильные стороны и потенциал с нашим готовым отчетом по типу личности – доступно сразу после заказа!',
};

export const Banner = ({
    color = 'violet',
    actionSlot,
    title = BANNER_CONFIG.title,
    description = BANNER_CONFIG.description,
}: BannerProps) => {
    return (
        <Paper data-color={color} className={s.paper}>
            <InnerContainer className={s.inner}>
                <Title order={3} className={s.title}>
                    <Image aria-hidden className={s.emoji} src='/images/sparkles.png' />
                    {title}
                </Title>
                <Text className={s.description}>{description}</Text>
                <Image className={s.image} aria-hidden src='/images/man_book.webp' w={341} h={305} />
                {actionSlot}
            </InnerContainer>
        </Paper>
    );
};
