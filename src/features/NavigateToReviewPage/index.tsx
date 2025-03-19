import { Button, Stack, Text } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import s from './NavigateToReviewPage.module.css';

export const NavigateToReviewPage = () => {
    const {
        routeParams: { reportId },
        isMobile,
    } = usePageContext();

    return (
        <Stack gap={40} mb={isMobile ? 40 : 60} justify='center' align='center' ta='center'>
            <Text className={s.text}>Хотите поделиться отзывом об отчёте? Мы будем рады услышать вас!</Text>

            <Button
                maw={311}
                w='100%'
                variant='outline'
                component='a'
                c='dark.7'
                color='dark.7'
                href={`/review/${reportId}`}
                fz={isMobile ? 16 : 20}
                size={isMobile ? 'md' : 'xl'}
            >
                Оставить отзыв
            </Button>
        </Stack>
    );
};
