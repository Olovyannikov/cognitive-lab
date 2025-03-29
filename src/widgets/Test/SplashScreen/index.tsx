import { useEffect, useState } from 'react';
import { Box, Button, Container, Flex, Stack, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { PageLoader, RainbowButton } from '@/shared/ui';

import { ReportModel } from '@/entities/Report';
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
    const [reportsLen] = useUnit([ReportModel.$allUserReports.map((reports) => reports?.length)]);
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const onStartClickHandler = () => {
        testAgain();
        setSplashScreen(false);
    };

    if (!mounted) return <PageLoader />;

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
                    <RainbowButton
                        mb='xl'
                        size='xl'
                        component='button'
                        fz={!isMobile || isLarge ? 'lg' : 'md'}
                        onClick={() => setSplashScreen(false)}
                        mx='auto'
                        maw={isLarge ? 350 : '100%'}
                    >
                        {isStarted ? 'Продолжить тестирование' : 'Пройти тестирование'}
                    </RainbowButton>
                    {reportsLen > 0 && (
                        <Button
                            fz={!isMobile || isLarge ? 'lg' : 'md'}
                            variant='outline'
                            size='xl'
                            w='100%'
                            maw={isLarge ? 350 : '100%'}
                            mx='auto'
                            onClick={onStartClickHandler}
                        >
                            Начать заново
                        </Button>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};
