import { Flex, Progress, Text } from '@mantine/core';
import { useUnit } from 'effector-react';

import { desktop } from '@/shared/media';

import s from './TestProgress.module.css';

interface TestProgressProps {
    value: number;
    page: number;
    total: number;
}

export const TestProgress = ({ value, total, page }: TestProgressProps) => {
    const isLarge = useUnit(desktop.$matches);

    return (
        <Flex gap='xl' mb='lg' align='center' h='fit-content'>
            <Progress
                value={value}
                color='violet.4'
                className={s.progress}
                transitionDuration={200}
                size={isLarge ? 'xl' : 'lg'}
            />
            <Text c='dark.2' className={s.text}>
                {page}/{total}
            </Text>
        </Flex>
    );
};
