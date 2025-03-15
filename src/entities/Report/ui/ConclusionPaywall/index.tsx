import type { ReactNode } from 'react';
import { Group, Image, Paper, Stack, Text, Title } from '@mantine/core';

import { useIsLarge } from '@/shared/hooks';
import { Picture, PointsList } from '@/shared/ui';

interface ConclusionPaywallProps {
    text?: string;
    title?: string;
    points?: string[];
    actionsSlot?: ReactNode;
    color?: string;
}

export const ConclusionPaywall = ({ text, title, points, actionsSlot, color = 'violet' }: ConclusionPaywallProps) => {
    const isLarge = useIsLarge();

    return (
        <Paper
            bg={`${color}.0`}
            pos='relative'
            py={isLarge ? '3xl' : 'xl'}
            px={isLarge ? '3xl' : 'md'}
            radius={isLarge ? 'lg' : 'md'}
        >
            <Image
                src='/images/gem.png'
                w={isLarge ? 250 : 108}
                h={isLarge ? 250 : 108}
                pos='absolute'
                top={-7}
                right={0}
            />
            <Stack gap={isLarge ? 'lg' : 'md'}>
                <Title order={5} fz={isLarge ? 32 : 20} textWrap='balance' maw={isLarge ? '100%' : '60%'}>
                    <Group gap='xs'>
                        <Picture visibleFrom='md' src='/emoji/star' w={48} h={48} />
                        {title}
                    </Group>
                </Title>
                <Text maw={isLarge ? 820 : '100%'} fz={isLarge ? 24 : 16}>
                    {text}
                </Text>
                <PointsList position='static' points={points} />
                <Group gap='sm' w={isLarge ? 'fit-content' : '100%'}>
                    {actionsSlot}
                </Group>
            </Stack>
        </Paper>
    );
};
