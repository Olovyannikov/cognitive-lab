import type { ReactNode } from 'react';
import { Image, Paper, Text, Title } from '@mantine/core';

import { InnerContainer } from '@/shared/ui';

import s from './Banner.module.css';

interface BannerProps {
    color?: string;
    actionSlot?: ReactNode;
}

export const Banner = ({ color, actionSlot }: BannerProps) => {
    return (
        <Paper data-color={color} className={s.paper}>
            <InnerContainer>
                <Title order={3} className={s.title}>
                    <Image aria-hidden className={s.emoji} src='/images/sparkles.png' />
                    Купить отчет без прохождения теста
                </Title>
                <Text className={s.description}>
                    Узнайте свои сильные стороны и потенциал с нашим готовым отчетом по типу личности – доступно сразу
                    после заказа!
                </Text>
                <Image className={s.image} aria-hidden src='/images/man_book.webp' w={341} h={305} />
                {actionSlot}
            </InnerContainer>
        </Paper>
    );
};
