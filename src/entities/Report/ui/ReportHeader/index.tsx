import { Image, Paper, Stack, Text, Title } from '@mantine/core';
import clsx from 'clsx';

import CircleImage from '@/app/assets/images/circle.svg?react';
import CircleSmallImage from '@/app/assets/images/circle_small.svg?react';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';
import { useIsMedium } from '@/shared/hooks';

import s from './ReportHeader.module.css';

interface ReportHeaderProps {
    type: string;
    name: string;
    preTitle?: string;
}

export const ReportHeader = ({ type, name, preTitle = 'Ваш тип личности' }: ReportHeaderProps) => {
    const currentColor = TYPE_TO_COLOR_MAP[type];
    const isLarge = useIsMedium();
    const currentName = name?.split('—')[1]?.replaceAll('»', '').replaceAll('«', '');

    return (
        <Paper className={s.paper} data-color={currentColor}>
            <Stack className={s.stack}>
                <Text className={s.personalityType}>{preTitle}</Text>
                <Title className={s.name}>{currentName ?? name}</Title>
            </Stack>
            <Image
                draggable={false}
                className={s.character}
                src={`/images/types/${isLarge ? '' : 'mobile/'}${type}.png`}
                width={isLarge ? 400 : 343}
                height={isLarge ? 400 : 247}
            />
            <CircleImage data-color={currentColor} className={clsx(s.image, s.desktop)} />
            <CircleSmallImage data-color={currentColor} className={clsx(s.image, s.mobile)} />
        </Paper>
    );
};
