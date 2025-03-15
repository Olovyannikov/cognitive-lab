import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image, Paper, Stack, Text, Title } from '@mantine/core';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { REVIEWS_MOCK } from '@/pages/IndexPage/ui/PeopleTalk/const';
import { desktop } from '@/shared/media';

import { Section } from '../Section';

import s from './MoreInBlog.module.css';

export const MoreInBlog = () => {
    const isLarge = useUnit(desktop.$matches);
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
    return (
        <Section containerClassName={s.container}>
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
                onPointerLeave={autoplay.current.reset}
            >
                {[...REVIEWS_MOCK, ...REVIEWS_MOCK, ...REVIEWS_MOCK].map((review, index) => (
                    <Carousel.Slide key={index}>
                        <Paper component='a' href='/blog' withBorder className={s.paper}>
                            <Stack justify='space-between' align='flex-start' gap='md'>
                                <Image src={review.image} className={s.image} width={286} height={304} />
                                <Title order={5} className={s.cardTitle}>
                                    {review.username}
                                </Title>
                                <Text lineClamp={isLarge ? 6 : 8} className={s.blogText}>
                                    {review.review}
                                </Text>
                            </Stack>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Section>
    );
};
