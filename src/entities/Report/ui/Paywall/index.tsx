import type { ReactNode } from 'react';
import { Box, Button, Group, Image } from '@mantine/core';

import { PointsList } from '@/shared/ui';

import s from './Paywall.module.css';

interface PaywallProps {
    points?: string[];
    title?: string;
    button_text?: ReactNode;
    color?: string;
    surveyId?: string;
    index?: number;
    mbti?: string;
}

function isOdd(num: number) {
    return num % 2;
}

export const Paywall = ({
    points,
    button_text,
    title = 'Больше о Вас в полном отчете',
    color,
    surveyId,
    index = 0,
    mbti = 'ENTJ',
}: PaywallProps) => {
    return (
        <Box className={s.wrapper}>
            <Group wrap='nowrap' gap='xs' className={s.top}>
                <Image w='3xl' h='3xl' src='/images/lock.webp' />
                <h3>{title}</h3>
            </Group>
            <Image className={s.paywallMan} src={`/images/circles/${mbti}_${isOdd(index) ? 0 : 2}.png`} />
            <PointsList className={s.points} points={points} color={color} />
            <Box className={s.actions}>
                <Button
                    size='lg'
                    radius='md'
                    color='dark.6'
                    component='a'
                    href={`/purchase${surveyId ? `/personal/${surveyId}` : ''}`}
                    leftSection={<Image w={20} h={20} src='/images/key.webp' aria-hidden={true} alt='' />}
                >
                    {button_text}
                </Button>
            </Box>
        </Box>
    );
};
