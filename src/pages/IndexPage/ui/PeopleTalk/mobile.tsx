import { Box, Drawer, Group, Rating, Text } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture } from '@/shared/ui';

import { PeopleTalkModel } from './model';

import s from './PeopleTalk.module.css';

export const Mobile = () => {
    const { isMobile } = usePageContext();

    const [opened, setIsActive, currentReview, close] = useUnit([
        PeopleTalkModel.$isModalOpened,
        PeopleTalkModel.carouselActiveStateSettled,
        PeopleTalkModel.$currentReview,
        PeopleTalkModel.modalActiveStateSettled,
    ]);

    return (
        <Drawer
            className={s.drawer}
            position='bottom'
            opened={isMobile && opened}
            onClose={() => {
                close(false);
                setIsActive(true);
            }}
        >
            <>
                <Group justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                    <Box>
                        <Rating
                            size={!isMobile ? 'lg' : 'md'}
                            readOnly
                            defaultValue={currentReview?.overall_rate}
                            mb='xs'
                            fractions={4}
                        />
                        <Text mb='xxs' className={s.name}>
                            {currentReview?.name}
                        </Text>
                        <Text className={s.label}>{currentReview?.mbti_type}</Text>
                    </Box>
                    <Picture cdn src={`/types/circles/${currentReview?.mbti_type}`} className={s.image} w={60} h={60} />
                </Group>
                <Text className={s.reviewText}>{currentReview?.text}</Text>
                <Text fz={18} c='dark.2' mt='auto'>
                    {currentReview?.created_at}
                </Text>
            </>
        </Drawer>
    );
};
