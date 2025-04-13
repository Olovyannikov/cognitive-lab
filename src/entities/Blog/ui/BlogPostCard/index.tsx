import { memo } from 'react';
import { Card, Flex, Grid, Image, Stack, Title } from '@mantine/core';
import clsx from 'clsx';

import { Markdown } from '@/shared/ui';

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
                    <Markdown>{post.body.data}</Markdown>
                </Stack>
            </Flex>
        </Card>
    </Grid.Col>
));

BlogPostCard.displayName = 'BlogPostCard';
