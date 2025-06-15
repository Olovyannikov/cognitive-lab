import { useContext } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Button, Center, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowRight, Trophy } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react/effector-react.umd';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture } from '@/shared/ui';

import { getFreeResultQuery } from '@/entities/Report';

import { CongratulationsContext } from '../../context/CongratulationsProvider';

export const FirstSlide = () => {
    const { data } = useUnit(getFreeResultQuery);

    const { onNextSlideHandler } = useContext(CongratulationsContext);
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Center ta='center'>
                <Stack gap='md'>
                    <Text fz={18} fw='bold'>
                        Поздравляем!
                    </Text>
                    <Title order={2} fz={26}>
                        Ваш тип личности —{' '}
                        <Text fz={26} fw={700} inline c='violet.7'>
                            {data?.title}
                        </Text>
                    </Title>
                    <Picture
                        width={180}
                        height={180}
                        m='auto'
                        cdn
                        src={`/types/circles/${data?.mbti_type}`}
                        extraPath={'_2'}
                    />
                    <Paper
                        maw='65%'
                        top={-50}
                        pos='relative'
                        mb={-50}
                        ml='auto'
                        mr='auto'
                        style={{ zIndex: 1, borderBottomRightRadius: 0 }}
                        radius={'sm'}
                        c='violet.7'
                        bg='violet.0'
                        p='xs'
                    >
                        <Flex gap='xs' align='center'>
                            <Flex style={{ borderRadius: 'var(--mantine-radius-xs)' }} p='xs' bg='violet.1'>
                                <Trophy size={14} />
                            </Flex>
                            <Text fz={11} fw={500} lh='normal' ta='left'>
                                Вы входите в <b>топ-10%</b> людей с таким мышлением!
                            </Text>
                        </Flex>
                    </Paper>
                    <Stack ta='left'>
                        <Text>Мы подготовили для вас два отчета:</Text>
                        <Box>
                            <Paper mb={2} c='violet.7' p='md' w='fit-content' bg='violet.0'>
                                <Text mb={4} fz={18} fw='bold'>
                                    Базовый
                                </Text>
                                <Text fz={14} c='violet.3'>
                                    Краткий профиль
                                </Text>
                            </Paper>
                            <Text fz={12} fw={500} c='violet.7' ml='md'>
                                Уже доступен
                            </Text>
                        </Box>
                        <Box>
                            <Paper mb={2} c='violet.7' p='md' w='fit-content' bg='gray.2'>
                                <Text c='gray.7' mb={4} fz={18} inline fw='bold'>
                                    Полный за 990&nbsp;
                                    <Text component='span' fw='600' inline ff='system-ui'>
                                        ₽
                                    </Text>
                                </Text>
                                <Text fz={14} c='gray.6'>
                                    Детальная инструкция к вашей личности
                                </Text>
                            </Paper>
                            <Text fz={12} fw={500} c='gray.6' ml='md'>
                                Доступен после оплаты
                            </Text>
                        </Box>
                    </Stack>
                    <Stack gap='sm'>
                        <Button
                            size='md'
                            variant='filled'
                            rightSection={<ArrowRight size={20} />}
                            onClick={onNextSlideHandler}
                        >
                            А что в полном отчёте?
                        </Button>
                        <Button component='a' href={`/free-report/${id}`} size='md' variant='subtle' c='dark.2'>
                            Не хочу это знать
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </Carousel.Slide>
    );
};
