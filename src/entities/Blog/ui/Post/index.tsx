import type { ReactNode } from 'react';
import { Blockquote, Divider, Image, List, Stack, Text, Title } from '@mantine/core';
import Markdown from 'markdown-to-jsx';
import { usePageContext } from 'vike-react/usePageContext';

import { InnerContainer } from '@/shared/ui';

import type { BlogPost } from '../../types';

import s from './Post.module.css';

interface PostProps {
    post: BlogPost;
    bannerSlot?: ReactNode;
}

export const Post = ({ post, bannerSlot }: PostProps) => {
    const { isMobile } = usePageContext();

    return (
        <Stack align='flex-start'>
            <Image className={s.image} src={post.image} alt='post' />
            <InnerContainer style={{ overflow: 'hidden' }} w='100%'>
                <Title mb='md'>{post.title}</Title>
                <Markdown
                    options={{
                        overrides: {
                            h1: (props) => (
                                <Title mb={16} order={1}>
                                    {props.children}
                                </Title>
                            ),
                            h2: (props) => (
                                <Title mb={16} order={2}>
                                    {props.children}
                                </Title>
                            ),
                            h3: (props) => (
                                <Title mb={16} order={3}>
                                    {props.children}
                                </Title>
                            ),
                            h4: (props) => (
                                <Title mb={16} order={4}>
                                    {props.children}
                                </Title>
                            ),
                            h5: (props) => (
                                <Title mb={16} order={5}>
                                    {props.children}
                                </Title>
                            ),
                            ol: (props) => (
                                <List mb={16} type='ordered'>
                                    {props.children}
                                </List>
                            ),
                            ul: (props) => <List mb={16}>{props.children}</List>,
                            li: (props) => <List.Item fz={isMobile ? 18 : 22}>{props.children}</List.Item>,
                            p: (props) => (
                                <Text className={s.text} mb={16}>
                                    {props.children}
                                </Text>
                            ),
                            hr: () => <Divider />,
                            blockquote: (props) => (
                                <Blockquote mb='md' py='sm' px='md' color={`violet.9`} bg='transparent' icon={null}>
                                    {props.children}
                                </Blockquote>
                            ),
                        },
                    }}
                >
                    {post.body.data}
                </Markdown>
            </InnerContainer>
            {bannerSlot}
        </Stack>
    );
};
