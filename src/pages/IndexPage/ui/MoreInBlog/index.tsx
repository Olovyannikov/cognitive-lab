import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Markdown from 'markdown-to-jsx';

import { desktop } from '@/shared/media';

import { getAllBlogPostsQuery } from '@/entities/Blog';

import { Section } from '../Section';

import s from './MoreInBlog.module.css';

export const MoreInBlog = () => {
    const isLarge = useUnit(desktop.$matches);
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
                plugins={[autoplay.current]}
                slideSize={isLarge ? 466 : '70%'}
                onMouseLeave={() => autoplay.current.play()}
                onPointerLeave={() => autoplay.current.play()}
                onPointerEnter={() => autoplay.current.stop()}
            >
                {currentBlogPosts.map((review, index) => (
                    <Carousel.Slide key={index}>
                        <Paper component='a' href='/blog' withBorder className={s.paper}>
                            <Stack justify='space-between' align='flex-start' gap='md'>
                                <Image src={review.image} className={s.image} width={304} height={304} />
                                <Title order={5} className={s.cardTitle}>
                                    {review.title}
                                </Title>
                                <Text c='dark.2'>{new Date(review.updated_at).toLocaleDateString()}</Text>
                                <Text lineClamp={isLarge ? 6 : 8} className={s.blogText}>
                                    <Markdown
                                        options={{
                                            overrides: {
                                                p: (props) => <Text {...props} />,
                                            },
                                        }}
                                    >
                                        {review.body.data}
                                    </Markdown>
                                </Text>
                            </Stack>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Section>
    );
};
