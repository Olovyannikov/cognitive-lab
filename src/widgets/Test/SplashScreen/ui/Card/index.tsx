import { Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

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

    return (
        <Paper className={s.paper}>
            <CircleImage className={s.background} />
            <Flex className={s.flex} align='center' gap='xs' flex={1}>
                <Picture className={s.picture} src={`/test/${isMobile ? 'mobile' : 'desktop'}/${image}`} />
                <Stack gap='xs'>
                    <Title className={s.title} order={4}>
                        {title}
                    </Title>
                    <Text className={s.text}>{text}</Text>
                </Stack>
            </Flex>
        </Paper>
    );
};
