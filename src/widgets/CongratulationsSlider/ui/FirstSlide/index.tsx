import { useContext } from 'react';
import { Carousel } from '@mantine/carousel';
import { ActionIcon, Box, Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowRight, Trophy, X } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react/effector-react.umd';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { Picture } from '@/shared/ui';

import { getFreeResultQuery } from '@/entities/Report';

import { CongratulationsContext } from '../../context/CongratulationsProvider';

import s from './FirstSlide.module.css';

export const FirstSlide = () => {
    const isLarge = useIsLarge();
    const { data } = useUnit(getFreeResultQuery);

    const { onNextSlideHandler } = useContext(CongratulationsContext);
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Box className={s.container}>
                <Stack gap='md'>
                    <Box className={s.top}>
                        <Text className={s.pretitle}>
                            <Picture className={s.titleImage} cdn src='/slider/popper' />
                            Поздравляем!
                        </Text>
                        <Title className={s.title} order={2}>
                            Ваш тип личности —{' '}
                            <Text inline c='violet.7'>
                                {data?.title ?? 'Командир (ENTJ)'}
                            </Text>
                        </Title>
                        <Picture
                            className={s.image}
                            width={180}
                            height={180}
                            m='auto'
                            cdn
                            src={`/types/circles/${data?.mbti_type ?? 'ENTJ'}`}
                            extraPath={'_2'}
                        />
                        <Paper className={s.badge}>
                            <Flex gap='xs' align='center'>
                                <Flex className={s.badgeIconContainer}>
                                    <Trophy size={14} />
                                </Flex>
                                <Text className={s.badgeText}>
                                    Вы входите в <b>топ-10%</b> людей с таким мышлением!
                                </Text>
                            </Flex>
                        </Paper>
                    </Box>

                    <Box className={s.reportInfo}>
                        <Text className={s.reportSubtitle}>Мы подготовили для вас два отчета:</Text>
                        <Flex className={s.reportTypesContainer}>
                            <Box>
                                <Paper className={s.reportType} data-first>
                                    <Text className={s.reportTitle} inline>
                                        Базовый
                                    </Text>
                                    <Text className={s.reportDescription} c='violet.3'>
                                        Краткий профиль
                                    </Text>
                                </Paper>
                                <Text className={s.availability}>Уже доступен</Text>
                            </Box>
                            <Box>
                                <Paper className={s.reportType} bg='gray.2' data-last>
                                    <Text c='gray.7' inline className={s.reportTitle}>
                                        Полный за 990&nbsp;
                                        <Text component='span' fw='600' inline ff='system-ui'>
                                            ₽
                                        </Text>
                                    </Text>
                                    <Text className={s.reportDescription} c='gray.6'>
                                        Детальная инструкция к вашей личности
                                    </Text>
                                </Paper>
                                <Text c='gray.6' className={s.availability}>
                                    Доступен после оплаты
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Stack gap='sm'>
                        <Button
                            variant='filled'
                            size={isLarge ? 'xl' : 'md'}
                            onClick={onNextSlideHandler}
                            w={isLarge ? 'fit-content' : '100%'}
                            rightSection={<ArrowRight size={isLarge ? 24 : 20} />}
                        >
                            А что в полном отчёте?
                        </Button>
                        {!isLarge && (
                            <Button component='a' href={`/free-report/${id}`} size='md' variant='subtle' c='dark.2'>
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
