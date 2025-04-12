import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Blockquote, Box, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Markdown from 'markdown-to-jsx';
import { usePageContext } from 'vike-react/usePageContext';

import { getAllBlogPostsQuery } from '@/entities/Blog';

import { Section } from '../Section';

import s from './MoreInBlog.module.css';

export const MoreInBlog = () => {
    const { isMobile } = usePageContext();
    const { data } = useUnit(getAllBlogPostsQuery);
    const autoplay = useRef(
        AutoScroll({
            playOnInit: true,
            startDelay: 200,
            stopOnMouseEnter: true,
            stopOnInteraction: true,
            active: true,
            speed: 0.5,
            direction: 'backward',
        })
    );
    const wheel = useRef(WheelGesturesPlugin({}));

    const currentBlogPosts =
        data.payload?.length > 5
            ? data.payload
            : [...(data.payload ?? []), ...(data.payload ?? []), ...(data.payload ?? [])];

    return (
        <Section hidden={!currentBlogPosts.length} containerClassName={s.container}>
            <Title className={s.mainTitle} order={2}>
                Узнать больше <br />
                в&nbsp;
                <a href='/blog'>
                    блоге <ArrowUpRight />
                </a>
            </Title>
            <Carousel
                loop
                slideGap='lg'
                withControls={false}
                plugins={[autoplay.current, wheel.current]}
                slideSize={isMobile ? '70%' : 466}
                onMouseLeave={() => autoplay?.current?.play?.()}
                onPointerLeave={() => autoplay?.current?.play?.()}
                onPointerEnter={() => autoplay?.current?.stop?.()}
            >
                {currentBlogPosts.map((post, index) => (
                    <Carousel.Slide key={index} h='unset'>
                        <Paper h='100%' component='a' href={`/blog/${post.id}`} withBorder className={s.paper}>
                            <Stack justify='space-between' align='flex-start' gap='md'>
                                <Image src={post.image} className={s.image} width={304} height={304} />
                                <Title order={5} className={s.cardTitle}>
                                    {post.title}
                                </Title>
                                <Text c='dark.2'>{post.updated_at}</Text>
                                <Box mah={150} style={{ overflow: 'hidden' }}>
                                    <Markdown
                                        options={{
                                            overrides: {
                                                p: (props) => (
                                                    <Text
                                                        {...props}
                                                        mah={150}
                                                        style={{
                                                            overflow: 'hidden',
                                                        }}
                                                        className={s.blogText}
                                                        lineClamp={6}
                                                    />
                                                ),
                                                a: (props) => <>{props.children}</>,
                                                blockquote: (props) => (
                                                    <Blockquote
                                                        mah={150}
                                                        py={0}
                                                        style={{
                                                            overflow: 'hidden',
                                                        }}
                                                        mb='md'
                                                        px='md'
                                                        color={`violet.9`}
                                                        bg='transparent'
                                                        icon={null}
                                                    >
                                                        {props.children}
                                                    </Blockquote>
                                                ),
                                            },
                                        }}
                                    >
                                        {post.body.data}
                                    </Markdown>
                                </Box>
                            </Stack>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Section>
    );
};
