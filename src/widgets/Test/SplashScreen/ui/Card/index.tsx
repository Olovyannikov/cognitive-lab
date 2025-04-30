import { Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { Picture } from '@/shared/ui';

import CircleImage from './circle.svg?react';

import s from './Card.module.css';

interface CardProps {
    title: string;
    text: string;
    image: string;
}

export const Card = ({ text, image, title }: CardProps) => {
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();

    return (
        <Paper className={s.paper}>
            <CircleImage className={s.background} />
            <Flex className={s.flex} align='center' gap={isLarge || !isMobile ? 'lg' : 'xs'} flex={1}>
                <Picture className={s.picture} src={`/mbti-test/${isMobile ? 'mobile' : 'desktop'}/${image}`} />
                <Stack gap={isLarge || !isMobile ? 'lg' : 'xs'} flex={1}>
                    <Title className={s.title} order={4}>
                        {title}
                    </Title>
                    <Text className={s.text}>{text}</Text>
                </Stack>
            </Flex>
        </Paper>
    );
};
