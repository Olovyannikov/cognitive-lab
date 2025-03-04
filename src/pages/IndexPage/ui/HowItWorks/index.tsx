import { Box, Button, Flex, Paper, Text, Title } from '@mantine/core';

import { FLOW_STEPS } from './const';
import s from './HowItWorks.module.css';
import { Decor, icons } from './Icons';

export const HowItWorks = () => {
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
            <Button className={s.button} component='a' href='/test' variant='subtle'>
                Пройти тест
            </Button>
        </Paper>
    );
};
