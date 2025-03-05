import { useRef, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Drawer, Group, Image, Modal, Paper, Rating, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUnit } from 'effector-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import { desktop } from '@/shared/media';

import { Section } from '../Section';
import { REVIEWS_MOCK } from './const';
import s from './PeopleTalk.module.css';

export const PeopleTalk = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const autoplay = useRef(
        AutoScroll({
            playOnInit: true,
            startDelay: 200,
            stopOnMouseEnter: true,
            stopOnInteraction: true,
            active: isActive,
        })
    );
    const isLarge = useUnit(desktop.$matches);
    const [opened, { open, close }] = useDisclosure(false);
    const [currentReview, setCurrentReview] = useState<{
        id: number;
        username: string;
        image: string;
        label: string;
        rating: number;
        review: string;
    } | null>(null);

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
                onMouseLeave={() => autoplay.current.play()}
                onPointerLeave={autoplay.current.reset}
            >
                {[...REVIEWS_MOCK, ...REVIEWS_MOCK, ...REVIEWS_MOCK].map((review, index) => (
                    <Carousel.Slide key={index}>
                        <Paper
                            onClick={() => {
                                setCurrentReview(review);
                                open();
                                setIsActive(false);
                            }}
                            withBorder
                            className={s.paper}
                        >
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
                            <Text lineClamp={isLarge ? 6 : 8} className={s.reviewText}>
                                {review.review}
                            </Text>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
            <Drawer className={s.drawer} position='bottom' opened={!isLarge && opened} onClose={close}>
                <>
                    <Group justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                        <Box>
                            <Rating
                                size={isLarge ? 'lg' : 'md'}
                                readOnly
                                defaultValue={currentReview?.rating}
                                mb='xs'
                            />
                            <Text mb='xxs' className={s.name}>
                                {currentReview?.username}
                            </Text>
                            <Text className={s.label}>{currentReview?.label}</Text>
                        </Box>
                        <Image src={currentReview?.image} className={s.image} w={60} h={60} />
                    </Group>
                    <Text className={s.reviewText}>{currentReview?.review}</Text>
                </>
            </Drawer>
            <Modal size='lg' centered opened={isLarge && opened} onClose={close}>
                <>
                    <Group px={40} justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                        <Box>
                            <Rating
                                size={isLarge ? 'lg' : 'md'}
                                readOnly
                                defaultValue={currentReview?.rating}
                                mb='xs'
                            />
                            <Text mb='xxs' className={s.name}>
                                {currentReview?.username}
                            </Text>
                            <Text className={s.label}>{currentReview?.label}</Text>
                        </Box>
                        <Image src={currentReview?.image} className={s.image} w={60} h={60} />
                    </Group>
                    <Text pb={40} px={40} className={s.reviewText}>
                        {currentReview?.review}
                    </Text>
                </>
            </Modal>
        </Section>
    );
};
