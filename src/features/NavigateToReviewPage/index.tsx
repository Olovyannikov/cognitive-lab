import { Button, Stack, Text } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { getSurveysInfoQuery } from '@/entities/Report';

import s from './NavigateToReviewPage.module.css';

export const NavigateToReviewPage = () => {
    const {
        routeParams: { reportId },
        isMobile,
    } = usePageContext();
    const hasComment = useUnit(
        getSurveysInfoQuery.$data.map((user) => user?.left_comments.find((comment) => comment.user_report === reportId))
    );
    if (hasComment) return;

    return (
        <Stack gap={isMobile ? 'lg' : '5xl'} mb={isMobile ? 'xl' : 100} justify='center' align='center' ta='center'>
            <Text className={s.text}>Хотите поделиться отзывом об отчёте? Мы будем рады услышать вас!</Text>

            <Button
                maw={311}
                fullWidth
                component='a'
                variant='default'
                href={`/review/${reportId}`}
                size={isMobile ? 'sm' : 'lg'}
            >
                Оставить отзыв
            </Button>
        </Stack>
    );
};
