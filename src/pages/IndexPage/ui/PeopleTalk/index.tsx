import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Group, Image, Paper, Rating, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { desktop } from '@/shared/media';

import { Section } from '../Section';
import { REVIEWS_MOCK } from './const';
import s from './PeopleTalk.module.css';

export const PeopleTalk = () => {
    const autoplay = useRef(AutoScroll({ playOnInit: true, startDelay: 200, stopOnMouseEnter: true }));
    const isLarge = useUnit(desktop.$matches);

    return (
        <Section containerClassName={s.container}>
            <Title className={s.title}>
                Что о нас&nbsp;
                <span>говорят?</span>
            </Title>
            <Carousel
                onMouseLeave={() => autoplay.current.play()}
                loop
                slideSize={isLarge ? 624 : '70%'}
                slideGap='lg'
                withControls={false}
                plugins={[autoplay.current]}
            >
                {REVIEWS_MOCK.map((review, index) => (
                    <Carousel.Slide key={index}>
                        <Paper withBorder className={s.paper}>
                            <Group justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                                <Box>
                                    <Rating
                                        size={isLarge ? 'lg' : 'md'}
                                        readOnly
                                        defaultValue={review.rating}
                                        mb='xs'
                                    />
                                    <Text mb='xxs' className={s.name}>
                                        {review.username}
                                    </Text>
                                    <Text className={s.label}>{review.label}</Text>
                                </Box>
                                <Image src={review.image} className={s.image} w={60} h={60} />
                            </Group>
                            <Text className={s.reviewText}>{review.review}</Text>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Section>
    );
};
