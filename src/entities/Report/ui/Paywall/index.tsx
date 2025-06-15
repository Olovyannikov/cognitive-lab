import type { ReactNode } from 'react';
import { Box, Button, Flex, Group } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { ROUTES } from '@/shared/config';
import { useIsLarge } from '@/shared/lib';
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
    action?: ReactNode;
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
    mbti = 'ENTP',
    action = null,
}: PaywallProps) => {
    const isLarge = useIsLarge();
    const {
        routeParams: { reportId },
        url,
    } = usePageContext();

    const isExamplePage = url.includes('example');

    const currentUrl = () => {
        let href = `/purchase`;

        if (isExamplePage) {
            href = ROUTES.TEST;
            return href;
        }

        if (surveyId) {
            href += `/${surveyId}`;
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
                <Picture w='3xl' h='3xl' cdn src='/emoji/lock' />
                <h3>{title}</h3>
            </Group>
            <Picture className={s.paywallMan} src={`/types/circles/${mbti}`} extraPath={isOdd(index) ? '_2' : ''} />
            <PointsList className={s.points} points={points} color={color} />
            <Flex className={s.actions} gap='sm'>
                <Button
                    component='a'
                    fullWidth
                    miw={150}
                    href={currentUrl()}
                    size={isLarge ? 'md' : 'sm'}
                    maw={isLarge ? 'fit-content' : '100%'}
                    leftSection={<Picture w={20} h={20} cdn src='/emoji/key' aria-hidden={true} alt='' />}
                >
                    {isExamplePage ? 'Пройти тест' : button_text}
                </Button>
                {action}
            </Flex>
        </Box>
    );
};
