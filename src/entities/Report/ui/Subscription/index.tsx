import type { ReactNode } from 'react';
import { Image, Paper, Stack, Text, Title } from '@mantine/core';

import { useIsHuge, useIsLarge } from '@/shared/hooks';

interface SubscriptionProps {
    title?: string;
    text?: string;
    subscriptionFormSlot?: ReactNode;
}

export const Subscription = ({ title, text, subscriptionFormSlot }: SubscriptionProps) => {
    const isHuge = useIsHuge();
    const isLarge = useIsLarge();
    return (
        <Paper
            radius='lg'
            bg='violet.0'
            pos='relative'
            mt={isLarge ? 100 : 0}
            mx={isHuge ? -153 : 0}
            px={isLarge ? 153 : 'md'}
            py={isLarge ? '3xl' : 'xl'}
        >
            <Image
                pos='absolute'
                top={isLarge ? 32 : 5}
                right={isLarge ? 153 : 33}
                w={isLarge ? 261 : 90}
                h={isLarge ? 232 : 90}
                fit='contain'
                src='/images/mail.png'
            />
            <Stack>
                <Title order={5} fz={isLarge ? 32 : 20} textWrap='balance' maw='50%'>
                    {title}
                </Title>
                <Text fz={isLarge ? 24 : 18}>{text}</Text>
                {subscriptionFormSlot}
            </Stack>
        </Paper>
    );
};
