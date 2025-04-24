import { Paper, Stack, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { usePageContext } from 'vike-react/usePageContext';

import CircleImage from '@/shared/assets/images/circle.svg?react';
import CircleSmallImage from '@/shared/assets/images/circle_small.svg?react';
import { useIsLarge } from '@/shared/lib';
import { Picture } from '@/shared/ui';

import { TYPE_TO_COLOR_MAP } from '../../lib';

import s from './ReportHeader.module.css';

interface ReportHeaderProps {
    type: string;
    name: string;
    preTitle?: string;
}

export const ReportHeader = ({ type, name, preTitle = 'Ваш тип личности' }: ReportHeaderProps) => {
    const currentColor = TYPE_TO_COLOR_MAP[type];
    const { isMobile } = usePageContext();
    const isLarge = useIsLarge();
    const currentName = name?.split('—')[1]?.replaceAll('»', '').replaceAll('«', '');

    return (
        <Paper className={s.paper} data-color={currentColor}>
            <Stack className={s.stack}>
                <Text className={s.personalityType}>{preTitle}</Text>
                <Title className={s.name}>{currentName ?? name}</Title>
            </Stack>
            <Picture
                draggable={false}
                className={s.character}
                src={`/report/types/${isMobile ? 'mobile/' : ''}${type}`}
                w={!isLarge || isMobile ? 247 : 400}
                h={!isLarge || isMobile ? 247 : 380}
            />
            <CircleImage data-color={currentColor} className={clsx(s.image, s.desktop)} />
            <CircleSmallImage data-color={currentColor} className={clsx(s.image, s.mobile)} />
        </Paper>
    );
};
