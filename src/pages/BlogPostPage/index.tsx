import { Box, Container, Stack } from '@mantine/core';
import { useUnit } from 'effector-react';

import { getBlogPostByIdQuery, Post } from '@/entities/Blog';
import { Banner } from '@/entities/Report';
import { CALL_TO_ACTION } from '@/widgets/CTA';

import s from './BlogPostPage.module.css';

export const BlogPostPage = () => {
    const { data: post } = useUnit(getBlogPostByIdQuery);

    if (!post) return null;

    return (
        <Box component='section'>
            <Container>
                <Stack className={s.stack}>
                    <Post post={post} />
                    <Banner
                        title='Узнайте свой тип личности'
                        description='Наш тест — это мощный инструмент для самопознания и развития, который позволит вам глубже понять свои сильные стороны, определить области для роста и осознанно двигаться вперёд. Вы сами решаете, как использовать полученные знания и рекомендации, чтобы раскрыть свой потенциал и достичь поставленных целей.'
                        actionSlot={CALL_TO_ACTION['redirectToTest']}
                    />
                </Stack>
            </Container>
        </Box>
    );
};
