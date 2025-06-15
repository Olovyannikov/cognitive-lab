import { useContext } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Button, Center, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { usePageContext } from 'vike-react/usePageContext';

import { CongratulationsContext } from '../../context/CongratulationsProvider';

export const SecondSlide = () => {
    const { onNextSlideHandler } = useContext(CongratulationsContext);
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Center ta='center'>
                <Stack gap='3xl'>
                    <Stack gap='md'>
                        <Text fz={18} fw='700'>
                            Что вас ожидает в полном отчёте?
                        </Text>
                        <Title lh='normal' order={2} fz={26}>
                            <Text component='b' fw='bold' fz={26} inline c='violet.5'>
                                AI-инсайты&nbsp;
                            </Text>
                            для карьеры, мышления и жизни
                        </Title>
                    </Stack>
                    <Stack ta='left'>
                        <Paper p='sm' bg='violet.0'>
                            <Flex gap='xs'>
                                <Box w={20} h={20}>
                                    Ico
                                </Box>
                                <Box>
                                    <Title c='violet.7' fz={18} order={3}>
                                        Ваш личный карьерный гид
                                    </Title>
                                    <Text fz={14} fw={500} lh='normal'>
                                        Найдите профессии, где вы будете успешны и счастливы
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                        <Paper p='sm' bg='violet.0'>
                            <Flex gap='xs'>
                                <Box w={20} h={20}>
                                    Ico
                                </Box>
                                <Box>
                                    <Title c='violet.7' fz={18} order={3}>
                                        Пошаговый план развития
                                    </Title>
                                    <Text fz={14} fw={500} lh='normal'>
                                        Получите конкретные шаги, книги и курсы для вашего роста
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                        <Paper p='sm' bg='violet.0'>
                            <Flex gap='xs'>
                                <Box flex={1} w={20} h={20}>
                                    Ico
                                </Box>
                                <Box>
                                    <Title c='violet.7' fz={18} order={3}>
                                        Секреты вашего разума
                                    </Title>
                                    <Text fz={14} fw={500} lh='normal'>
                                        Узнайте, как преодолеть «ловушки разума» и управлять стрессом. партнерами и
                                        коллегами
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                    </Stack>
                    <Stack>
                        <Button
                            size='md'
                            onClick={onNextSlideHandler}
                            rightSection={<ArrowRight size={20} />}
                            variant='filled'
                        >
                            Как получить?
                        </Button>
                        <Button size='md' variant='subtle' component='a' href={`/free-report/${id}`} c='dark.2'>
                            Не хочу это знать
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </Carousel.Slide>
    );
};
