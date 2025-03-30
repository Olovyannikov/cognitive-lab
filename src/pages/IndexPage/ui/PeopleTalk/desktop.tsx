import { Box, Group, Modal, Rating, Text } from '@mantine/core';
import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { desktop } from '@/shared/media';
import { Picture } from '@/shared/ui';

import { PeopleTalkModel } from './model';

import s from './PeopleTalk.module.css';

export const Desktop = () => {
    const isLarge = useUnit(desktop.$matches);
    const { isMobile } = usePageContext();

    const [opened, setIsActive, currentReview, close] = useUnit([
        PeopleTalkModel.$isModalOpened,
        PeopleTalkModel.carouselActiveStateSettled,
        PeopleTalkModel.$currentReview,
        PeopleTalkModel.modalActiveStateSettled,
    ]);

    return (
        <Modal
            size='lg'
            centered
            opened={(!isMobile || isLarge) && opened}
            onClose={() => {
                close(false);
                setIsActive(true);
            }}
        >
            <>
                <Group px={40} justify='space-between' align='flex-start' gap='md' wrap='nowrap'>
                    <Box>
                        <Rating
                            size={!isMobile || isLarge ? 'lg' : 'md'}
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
                    <Picture src={`/types/circles/${currentReview?.mbti_type}`} className={s.image} w={100} h={100} />
                </Group>
                <Text pb={40} px={40} className={s.reviewText}>
                    {currentReview?.text}
                </Text>
                <Text px={40} fz={24} c='dark.2' mt='auto'>
                    {currentReview?.created_at}
                </Text>
            </>
        </Modal>
    );
};
