import { Box, Card, Text, Title } from '@mantine/core';

import { ROUTES } from '@/shared/config';

import { titleColorMap } from '../../config';
import type { PersonalityType } from '../../types';

import s from './PersonalityCard.module.css';

interface PersonalityCardProps {
    title: string;
    type: PersonalityType;
    description: string[];
    category: string;
}

export const PersonalityCard = ({ type, description, title, category }: PersonalityCardProps) => (
    <Card component='a' href={`${ROUTES.TYPES}/${type}`} className={s.wrapper}>
        <Box data-type={type} className={s.imageWrapper} data-color={titleColorMap[category]} />
        <Title className={s.title} order={3}>
            {title} ({type})
        </Title>
        <Text className={s.text}>{description[0]}</Text>
    </Card>
);
