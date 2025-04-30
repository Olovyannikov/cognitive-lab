import { useEffect, useState } from 'react';
import { Box, Button, Container, Flex, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { PageLoader } from '@/shared/ui';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { TestModel } from '@/entities/Test';

import { TakeTestAgainModel } from '@/features/TakeTestAgain';

import { CARDS } from './const';
import { Card } from './ui';

import s from './SplashScreen.module.css';

export const TestSplashScreen = () => {
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();
    const [isStarted, setSplashScreen, testAgain] = useUnit([
        TestModel.$currentProgress.map((progress) => progress > 0),
        TestModel.setSplashScreenVisibility,
        TakeTestAgainModel.takeTestAgainClicked,
    ]);
    const [reportsLen, isLoading, isStale] = useUnit([
        ReportModel.$allUserReports.map((reports) => reports?.length),
        getSurveysInfoQuery.$pending,
        getSurveysInfoQuery.$stale,
    ]);

    const [mounted, setMounted] = useState(false);

    const onStartClickHandler = () => {
        testAgain();
        setSplashScreen(false);
    };

    useEffect(() => setMounted(true), []);
    if (isStale || isLoading || !mounted) return <PageLoader />;

    return (
        <Box py={!isLarge || isMobile ? 0 : 120}>
            <Container mb='5xl'>
                <Stack gap={0}>
                    <Title className={s.title} order={2}>
                        Тест на определение типа личности
                    </Title>
                    <Flex className={s.cards}>
                        {CARDS.map((card) => (
                            <Card {...card} key={card.id} />
                        ))}
                    </Flex>
                    <Stack justify='center' align='center'>
                        {(reportsLen < 1 || isStarted) && (
                            <Button
                                fullWidth
                                maw={isLarge ? 350 : '100%'}
                                size={isLarge ? 'xl' : 'lg'}
                                className='mantine-button-rainbow'
                                onClick={() => setSplashScreen(false)}
                            >
                                {isStarted ? 'Продолжить тестирование' : 'Пройти тестирование'}
                            </Button>
                        )}
                        {reportsLen > 0 && (
                            <Button
                                fullWidth
                                variant='default'
                                maw={isLarge ? 350 : '100%'}
                                size={isLarge ? 'xl' : 'lg'}
                                onClick={onStartClickHandler}
                            >
                                Начать заново
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};
