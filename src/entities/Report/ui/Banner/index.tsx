import type { ReactNode } from 'react';
import { Image, Paper, Text, Title } from '@mantine/core';

import { InnerContainer } from '@/shared/ui';
import { Picture } from '@/shared/ui/Picture';

import s from './Banner.module.css';

interface BannerProps {
    color?: string;
    actionSlot?: ReactNode;
    title?: string;
    description?: string;
    image?: string;
}

const BANNER_CONFIG = {
    title: 'Купить отчет без прохождения теста',
    description:
        'Узнайте свои сильные стороны и потенциал с нашим готовым отчетом по типу личности – доступно сразу после заказа!',
    image: '/images/man_book.webp',
};

export const Banner = ({
    color = 'violet',
    actionSlot,
    title = BANNER_CONFIG.title,
    description = BANNER_CONFIG.description,
    image = BANNER_CONFIG.image,
}: BannerProps) => {
    return (
        <Paper data-color={color} className={s.paper}>
            <InnerContainer className={s.inner}>
                <Title order={3} className={s.title}>
                    <Picture className={s.emoji} src='/emoji/star' />
                    {title}
                </Title>
                <Text className={s.description}>{description}</Text>
                <Image className={s.image} aria-hidden src={image} w={260} h={260} />
                {actionSlot}
            </InnerContainer>
        </Paper>
    );
};
