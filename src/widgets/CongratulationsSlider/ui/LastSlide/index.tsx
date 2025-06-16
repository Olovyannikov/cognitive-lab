import { Carousel } from '@mantine/carousel';
import { ActionIcon, Box, Button, Stack, Text, Title } from '@mantine/core';
import { X } from '@phosphor-icons/react/dist/ssr';
import { usePageContext } from 'vike-react/usePageContext';

import { useIsLarge } from '@/shared/lib';
import { Picture } from '@/shared/ui';

import s from './LastSlide.module.css';

export const LastSlide = () => {
    const isLarge = useIsLarge();
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Box className={s.container}>
                <Stack gap='3xl'>
                    <Stack gap='md'>
                        <Text className={s.title}>
                            <Picture className={s.gem} cdn src='/slider/slide-3-gem' />
                            Один шаг до успеха!{isLarge ? '' : '!'}
                        </Text>
                        <Title className={s.subtitle} order={2}>
                            <Text component='b'>30+ страниц</Text> глубокого анализа, который окупается
                        </Title>
                        <Picture className={s.picture} cdn src='/slider/slide-3' />
                    </Stack>
                    <Text className={s.description}>
                        Получите практические советы и пошаговый план действий, чтобы раскрыть свой потенциал на 100%.
                    </Text>
                    <Stack className={s.controls}>
                        <Button
                            size={isLarge ? 'xl' : 'md'}
                            variant='filled'
                            component='a'
                            href={`/purchase?reportId=${id}`}
                        >
                            Получить мой полный отчёт за 990{' '}
                            <Text inline ff='system-ui'>
                                ₽
                            </Text>
                        </Button>
                        <Button
                            size={isLarge ? 'xl' : 'md'}
                            component='a'
                            href={`/free-report/${id}`}
                            c='dark.2'
                            color='dark.2'
                            variant='outline'
                        >
                            Посмотреть бесплатный отчет
                        </Button>
                        {isLarge && (
                            <ActionIcon
                                component='a'
                                pos='absolute'
                                right={40}
                                top={0}
                                c='gray'
                                variant='subtle'
                                href={`/free-report/${id}`}
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
