import { Box, Button, Center, Flex, Paper, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';

import { desktop } from '@/shared/media';

import { FLOW_STEPS } from './const';
import { Decor, icons } from './Icons';

import s from './HowItWorks.module.css';

export const HowItWorks = () => {
    const [isDesktop] = useUnit([desktop.$matches]);
    return (
        <Paper className={s.wrapper} radius={40} component='section'>
            <Decor />
            <Title className={s.title} order={2}>
                Как это работает?
            </Title>
            <Flex className={s.flex} gap='md'>
                {FLOW_STEPS.map((step, idx) => (
                    <Paper key={step.id} className={s.paper}>
                        <Box className={s.number}>{icons[idx]}</Box>
                        <Title className={s.cardTitle} order={4}>
                            {step.label}
                        </Title>
                        <Text className={s.cardText}>{step.description}</Text>
                    </Paper>
                ))}
            </Flex>
            <Center>
                <Button fullWidth component='a' href='/test' variant='white' maw={706} size={isDesktop ? 'xl' : 'md'}>
                    Пройти тест
                </Button>
            </Center>
        </Paper>
    );
};
