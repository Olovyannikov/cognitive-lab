import { useContext } from 'react';
import { Carousel } from '@mantine/carousel';
import { ActionIcon, Box, Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowRight, X } from '@phosphor-icons/react/dist/ssr';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { Picture } from '@/shared/ui';

import { CongratulationsContext } from '../../context/CongratulationsProvider';

import s from './SecondSlide.module.css';

export const SecondSlide = () => {
    const isLarge = useIsLarge();
    const { onNextSlideHandler } = useContext(CongratulationsContext);
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Box className={s.container}>
                <Stack gap='3xl'>
                    <Stack gap='md'>
                        <Text className={s.pretitle}>
                            <Picture className={s.titleIcon} cdn src='/slider/slide-2-loupe' />
                            Что вас ожидает в полном отчёте?
                        </Text>
                        <Title className={s.title} order={2}>
                            <Text component='b' fw='bold' inline c='violet.5'>
                                AI-инсайты&nbsp;
                            </Text>
                            для карьеры, мышления и жизни
                        </Title>
                    </Stack>
                    <Stack className={s.cards}>
                        <Paper className={s.card}>
                            <Flex gap='xs'>
                                <Box className={s.cardIcon}>
                                    <Picture cdn src='/slider/target' />
                                </Box>
                                <Box>
                                    <Title className={s.cardTitle} order={3}>
                                        Ваш личный карьерный гид
                                    </Title>
                                    <Text className={s.cardDescription}>
                                        Найдите профессии, где вы будете успешны и счастливы
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                        <Paper className={s.card}>
                            <Flex gap='xs'>
                                <Box className={s.cardIcon}>
                                    <Picture cdn src='/slider/grass' />
                                </Box>
                                <Box>
                                    <Title className={s.cardTitle} order={3}>
                                        Пошаговый план развития
                                    </Title>
                                    <Text className={s.cardDescription}>
                                        Получите конкретные шаги, книги и курсы для вашего роста
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                        <Paper className={s.card}>
                            <Flex gap='xs'>
                                <Box className={s.cardIcon}>
                                    <Picture cdn src='/slider/brain' />
                                </Box>
                                <Box>
                                    <Title className={s.cardTitle} order={3}>
                                        Секреты вашего разума
                                    </Title>
                                    <Text className={s.cardDescription}>
                                        Узнайте, как преодолеть «ловушки разума» и управлять стрессом. партнерами и
                                        коллегами
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>

                        <Paper className={s.card}>
                            <Flex gap='xs'>
                                <Box className={s.cardIcon}>
                                    <Picture cdn src='/slider/heart' />
                                </Box>
                                <Box>
                                    <Title className={s.cardTitle} order={3}>
                                        Ключи к отношениям
                                    </Title>
                                    <Text className={s.cardDescription}>
                                        Научитесь строить гармоничные связи с друзьями, партнерами и коллегами
                                    </Text>
                                </Box>
                            </Flex>
                        </Paper>
                    </Stack>
                    <Stack>
                        <Button
                            variant='filled'
                            size={isLarge ? 'xl' : 'md'}
                            onClick={onNextSlideHandler}
                            w={isLarge ? 'fit-content' : '100%'}
                            rightSection={<ArrowRight size={20} />}
                        >
                            Далее
                        </Button>
                        {!isLarge && (
                            <Button size='md' variant='subtle' component='a' href={`/free-report/${id}`} c='dark.2'>
                                Не хочу это знать
                            </Button>
                        )}
                        {isLarge && (
                            <ActionIcon
                                component='a'
                                href={`/free-report/${id}`}
                                pos='absolute'
                                right={40}
                                top={0}
                                c='gray'
                                variant='subtle'
                            >
                                <X />
                            </ActionIcon>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Carousel.Slide>
    );
};
