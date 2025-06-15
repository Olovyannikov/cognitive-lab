import { Carousel } from '@mantine/carousel';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

export const LastSlide = () => {
    const { routeParams } = usePageContext();

    const id = routeParams.id;

    return (
        <Carousel.Slide>
            <Center ta='center'>
                <Stack gap='3xl'>
                    <Stack gap='md'>
                        <Text fz={18} fw={700}>
                            Один шаг до успеха!!
                        </Text>
                        <Title fz={26} order={2} lh='normal'>
                            <Text component='b' fz={26} fw='bold' c='violet.5'>
                                30+ страниц
                            </Text>{' '}
                            глубокого анализа, который окупается
                        </Title>
                        Picture
                    </Stack>
                    <Text>
                        Получите практические советы и пошаговый план действий, чтобы раскрыть свой потенциал на 100%.
                    </Text>
                    <Stack>
                        <Button size='md' variant='filled' component='a' href={`/purchase?reportId=${id}`}>
                            Получить мой полный отчёт за 990{' '}
                            <Text inline ff='system-ui'>
                                ₽
                            </Text>
                        </Button>
                        <Button
                            size='md'
                            component='a'
                            href={`/free-report/${id}`}
                            c='dark.2'
                            color='dark.2'
                            variant='outline'
                        >
                            Посмотреть бесплатный отчет
                        </Button>
                    </Stack>
                </Stack>
            </Center>
        </Carousel.Slide>
    );
};
