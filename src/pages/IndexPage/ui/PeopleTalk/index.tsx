import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Group, Paper, Rating, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture, Section } from '@/shared/ui';

import { ReviewModel } from '@/entities/Review';

import { Desktop } from './desktop';
import { Mobile } from './mobile';
import { PeopleTalkModel } from './model';

import s from './PeopleTalk.module.css';

export const PeopleTalk = () => {
    const [reviews] = useUnit([ReviewModel.$allReviews]);
    const [isActive, setIsActive, setCurrentReview, open] = useUnit([
        PeopleTalkModel.$isCarouselActive,
        PeopleTalkModel.carouselActiveStateSettled,
        PeopleTalkModel.currentReviewSettled,
        PeopleTalkModel.modalActiveStateSettled,
    ]);
    const autoplay = useRef(
        AutoScroll({
            playOnInit: true,
            startDelay: 200,
            stopOnMouseEnter: true,
            active: isActive,
            stopOnInteraction: true,
            speed: 0.5,
        })
    );
    const wheel = useRef(WheelGesturesPlugin({}));

    const { isMobile } = usePageContext();

    const allReviewsList = reviews.length > 5 ? reviews : [...reviews, ...reviews, ...reviews];

    return (
        <Section containerClassName={s.container}>
            <Title className={s.title}>
                Что о нас&nbsp;
                <span>говорят?</span>
            </Title>
            <Carousel
                slideGap='lg'
                withControls={false}
                plugins={[autoplay.current, wheel.current]}
                slideSize={isMobile ? '70%' : 624}
                onMouseLeave={() => isActive && autoplay.current.play()}
                onPointerLeave={() => isActive && autoplay.current.play()}
                onPointerEnter={() => autoplay.current.stop()}
            >
                {allReviewsList.map((review, index) => (
                    <Carousel.Slide key={index} className={s.slide}>
                        <Paper
                            component='button'
                            display='flex'
                            w='100%'
                            ta='left'
                            style={{ flexDirection: 'column' }}
                            onClick={() => {
                                setCurrentReview(review);
                                open(true);
                                setIsActive(false);
                            }}
                            withBorder
                            className={s.paper}
                        >
                            <Group w='100%' justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                                <Box>
                                    <Rating
                                        size={isMobile ? 'md' : 'lg'}
                                        readOnly
                                        defaultValue={review.overall_rate}
                                        mb='xs'
                                        fractions={4}
                                    />
                                    <Text mb='xxs' className={s.name}>
                                        {review.name}
                                    </Text>
                                    <Text className={s.label}>{review.mbti_type}</Text>
                                </Box>
                                <Picture cdn src={`/types/circles/${review.mbti_type}`} className={s.image} />
                            </Group>
                            <Text mb='xs' lineClamp={isMobile ? 8 : 6} className={s.reviewText}>
                                {review.text}
                            </Text>
                            <Text className={s.reviewText} c='dark.2' mt='auto'>
                                {review.created_at}
                            </Text>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
            <Mobile />
            <Desktop />
        </Section>
    );
};
