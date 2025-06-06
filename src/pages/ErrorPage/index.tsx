import { Box, Button, Center, Container, Stack, Title } from '@mantine/core';

import { Picture } from '@/shared/ui';

import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import s from './ErrorPage.module.css';

interface ErrorPageProps {
    image?: string;
    title?: string;
}

export const ErrorPage = ({ title = 'Страница не найдена', image = '/errors/404' }: ErrorPageProps) => (
    <Box component='section'>
        <Container>
            <Center ta='center' className={s.center}>
                <Stack className={s.stack}>
                    <Picture cdn className={s.pic} src={image} width={400} height={400} />
                    <Title className={s.title} order={1}>
                        {title}
                    </Title>
                    <Button size='md' component='a' href='/'>
                        Перейти на главную
                    </Button>
                    <NavigateToHelpPage />
                </Stack>
            </Center>
        </Container>
    </Box>
);
