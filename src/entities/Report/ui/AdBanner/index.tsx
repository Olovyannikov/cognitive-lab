import type { PropsWithChildren } from 'react';
import { Flex, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';

import { Picture } from '@/shared/ui';

import { useIsLarge } from '../../../../shared/lib/hooks';

import s from './AdBanner.module.css';

interface AdBannerProps {
    content?: string;
    title?: string;
    type?: string;
}

const INITIAL_CONTENT =
    'Наш тест — это мощный инструмент для самопознания и развития, который позволит вам глубже понять\n' +
    '                    свои сильные стороны, определить области для роста и осознанно двигаться вперёд. Вы сами решаете,\n' +
    '                    как использовать полученные знания и рекомендации, чтобы раскрыть свой потенциал и достичь\n' +
    '                    поставленных целей.';

export const AdBanner = ({
    children,
    content = INITIAL_CONTENT,
    title = 'Узнайте свой тип личности',
    type = 'ESFJ',
}: PropsWithChildren<AdBannerProps>) => {
    const isLarge = useIsLarge();

    return (
        <Paper className={s.paper}>
            <Stack className={s.root}>
                <Group className={s.group}>
                    <Picture className={s.image} src='/emoji/star' />
                    <Title className={s.title} fz={20}>
                        {title}
                    </Title>
                </Group>
                <Text className={s.text}>{content}</Text>
                <Image
                    w={300}
                    h={340}
                    right={0}
                    bottom={0}
                    pos='absolute'
                    visibleFrom='xl'
                    className={s.image}
                    src={`/images/types/${isLarge ? '' : 'mobile/'}${type}.png`}
                />
                <Flex className={s.controls}>{children}</Flex>
            </Stack>
        </Paper>
    );
};
