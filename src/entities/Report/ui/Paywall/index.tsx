import type { ReactNode } from 'react';
import { Box, Button, Group } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture, PointsList } from '@/shared/ui';

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
    const {
        routeParams: { reportId },
    } = usePageContext();

    const currentUrl = () => {
        let href = `/purchase/`;

        if (surveyId) {
            href += `${surveyId}`;
        }

        if (mbti && !reportId) {
            href += `?type=${mbti}`;
        } else {
            href += `?reportId=${reportId}`;
        }

        return href;
    };

    return (
        <Box className={s.wrapper}>
            <Group wrap='nowrap' gap='xs' className={s.top}>
                <Picture w='3xl' h='3xl' src='/emoji/lock' />
                <h3>{title}</h3>
            </Group>
            <Picture className={s.paywallMan} src={`/types/circles/${mbti}`} extraPath={isOdd(index) ? '_2' : ''} />
            <PointsList className={s.points} points={points} color={color} />
            <Box className={s.actions}>
                <Button
                    size='lg'
                    radius='md'
                    color='dark.6'
                    component='a'
                    href={currentUrl()}
                    leftSection={<Picture w={20} h={20} src='/emoji/key' aria-hidden={true} alt='' />}
                >
                    {button_text}
                </Button>
            </Box>
        </Box>
    );
};
