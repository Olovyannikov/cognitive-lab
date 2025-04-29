import { Box, Container, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { FAQList, getFAQQuery } from '@/entities/FAQ';

import { PageLayout } from '@/widgets/PageLayout';

export const FaqPage = () => {
    const { data } = useUnit(getFAQQuery);

    return (
        <PageLayout title='Ответы на вопросы'>
            <Box component='section'>
                <Container>
                    <Box mb='3xl'>
                        <FAQList items={data?.payload} />
                    </Box>
                    <Text ta='center' fz={20}>
                        Остались вопросы? Напишите нам в{' '}
                        <Text fz={20} component='a' href='/help' span c='blue.7'>
                            Службу поддержки
                        </Text>
                    </Text>
                </Container>
            </Box>
        </PageLayout>
    );
};
