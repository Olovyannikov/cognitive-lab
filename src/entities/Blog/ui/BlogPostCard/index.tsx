import { memo } from 'react';
import { Blockquote, Box, Card, Flex, Grid, Image, Stack, Text, Title } from '@mantine/core';
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
        <Card className={s.cardMain} h='100%' withBorder component='a' href={`/blog/${post.id}`}>
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
                                    blockquote: (props) => (
                                        <Blockquote
                                            mb='md'
                                            py='sm'
                                            px='md'
                                            color={`violet.9`}
                                            bg='transparent'
                                            icon={null}
                                        >
                                            {props.children}
                                        </Blockquote>
                                    ),
                                    a: (props) => <>{props.children}</>,
                                },
                            }}
                        >
                            {post.body.data}
                        </Markdown>
                    </Box>
                </Stack>
            </Flex>
        </Card>
    </Grid.Col>
));

BlogPostCard.displayName = 'BlogPostCard';
