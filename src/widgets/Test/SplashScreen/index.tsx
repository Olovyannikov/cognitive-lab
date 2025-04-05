import { useEffect, useState } from 'react';
import { Box, Button, Container, Flex, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { useIsLarge } from '@/shared/lib';
import { PageLoader } from '@/shared/ui';

import { getSurveysInfoQuery, ReportModel } from '@/entities/Report';
import { TestModel } from '@/entities/Test';

import { TakeTestAgainModel } from '@/features/TakeTestAgain';

import { CARDS } from './const';
import { Card } from './ui';

import s from './SplashScreen.module.css';

export const TestSplashScreen = () => {
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
    const isLarge = useIsLarge();

    const [mounted, setMounted] = useState(false);

    const onStartClickHandler = () => {
        testAgain();
        setSplashScreen(false);
    };

    useEffect(() => setMounted(true), []);
    if (isStale || isLoading || !mounted) return <PageLoader />;

    return (
        <Box>
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
                                onClick={() => setSplashScreen(false)}
                            >
                                {isStarted ? 'Продолжить тестирование' : 'Пройти тестирование'}
                            </Button>
                        )}
                        {reportsLen > 0 && (
                            <Button
                                fullWidth
                                variant='outline'
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
