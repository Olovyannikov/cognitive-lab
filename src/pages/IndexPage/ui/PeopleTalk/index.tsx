import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Group, Paper, Rating, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { desktop } from '@/shared/media';
import { Picture } from '@/shared/ui';

import { ReviewModel } from '@/entities/Review';

import { Section } from '../Section';
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

    const isLarge = useUnit(desktop.$matches);

    const allReviewsList = reviews.length > 5 ? reviews : [...reviews, ...reviews, ...reviews];

    return (
        <Section containerClassName={s.container}>
            <Title className={s.title}>
                Что о нас&nbsp;
                <span>говорят?</span>
            </Title>
            <Carousel
                loop
                slideGap='lg'
                withControls={false}
                plugins={[autoplay.current]}
                slideSize={isLarge ? 624 : '70%'}
                onMouseLeave={() => isActive && autoplay.current.play()}
                onPointerLeave={() => isActive && autoplay.current.play()}
                onPointerEnter={() => autoplay.current.stop()}
            >
                {allReviewsList.map((review, index) => (
                    <Carousel.Slide key={index}>
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
                                        size={isLarge ? 'lg' : 'md'}
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
                                <Picture src={`/types/circles/${review.mbti_type}`} className={s.image} w={60} h={60} />
                            </Group>
                            <Text mb='xs' lineClamp={isLarge ? 6 : 8} className={s.reviewText}>
                                {review.text}
                            </Text>
                            <Text className={s.reviewText} c='dark.2' mt='auto'>
                                {new Date(review.created_at).toLocaleDateString()}
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
