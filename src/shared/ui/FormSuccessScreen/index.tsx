import type { ReactNode } from 'react';
import { Box, Text, Title } from '@mantine/core';

import { Picture } from '@/shared/ui';

import s from './FormSuccessScreen.module.css';

const BASE_TEXT = {
    title: 'Спасибо за ваш отзыв!',
    description: 'Спасибо за ваш отзыв!',
    image: '/images/success-base-man',
};

interface FormSuccessScreenProps {
    title?: string;
    description?: string;
    slots?: {
        action?: ReactNode;
    };
    image?: string;
}

export const FormSuccessScreen = ({
    title = BASE_TEXT.title,
    description = BASE_TEXT.description,
    image = BASE_TEXT.image,
    slots,
}: FormSuccessScreenProps) => (
    <Box className={s.box}>
        <Picture cdn className={s.image} w={145} aria-hidden={true} src={image} alt={title} />
        <Title className={s.title} order={3}>
            {title}
        </Title>
        <Text className={s.text}>{description}</Text>
        <Box className={s.action}>{slots?.action}</Box>
    </Box>
);
