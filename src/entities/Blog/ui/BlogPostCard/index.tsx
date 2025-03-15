import { memo } from 'react';
import { Box, Button, Card, Flex, Grid, Image, Stack, Text, Title } from '@mantine/core';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';

import type { BlogPost } from '../../types';

import s from './BlogPostCard.module.css';

interface BlogPostCardProps {
    post: BlogPost;
}

export const BlogPostCard = memo(({ post }: BlogPostCardProps) => (
    <Grid.Col
        span={{
            base: 12,
            lg: post.pinned ? 12 : 4,
        }}
        className={clsx(post.pinned && s.pinned)}
    >
        <Card h='100%' withBorder component='a' href={`/blog/${post.id}`}>
            <Flex className={clsx(s.card, post.pinned && s.row)} gap='md'>
                <Image className={s.image} fit='cover' radius='xs' src={post.thumbnail_image} alt={post.title} />
                <Stack className={s.preview} justify='center'>
                    <Title className={s.title}>{post.title}</Title>
                    <Box className={s.text}>
                        <Markdown
                            options={{
                                overrides: {
                                    h1: (props) => (
                                        <Title order={1} className={s.title}>
                                            {props.children}
                                        </Title>
                                    ),
                                    h2: (props) => (
                                        <Title order={2} className={s.title}>
                                            {props.children}
                                        </Title>
                                    ),
                                    p: (props) => <Text className={s.text}>{props.children}</Text>,
                                },
                            }}
                        >
                            {post.body.data}
                        </Markdown>
                    </Box>
                    <Button variant='subtle' rightSection={<ArrowRight />} className={s.more}>
                        Читать
                    </Button>
                </Stack>
            </Flex>
        </Card>
    </Grid.Col>
));

BlogPostCard.displayName = 'BlogPostCard';
