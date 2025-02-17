import { Paper, Stack, Text, Title } from '@mantine/core';
import clsx from 'clsx';

import CircleImage from '@/app/assets/images/circle.svg?react';
import CircleSmallImage from '@/app/assets/images/circle_small.svg?react';
import { TYPE_TO_COLOR_MAP } from '@/shared/constants';

import s from './ReportHeader.module.css';

interface ReportHeaderProps {
    type: string;
    name: string;
}

export const ReportHeader = ({ type, name }: ReportHeaderProps) => {
    const currentColor = TYPE_TO_COLOR_MAP[type];
    // const currentName = name.split('—')[1]?.replaceAll('»', '').replaceAll('«', '');

    return (
        <Paper className={s.paper} data-color={currentColor}>
            <Stack className={s.stack}>
                {/*<Text hidden={!showPreheader} className={s.personalityType}>*/}
                {/*    Ваш тип личности*/}
                {/*</Text>*/}
                <Title className={s.name}>{name}</Title>
                <Text className={s.type}>{type}</Text>
            </Stack>
            <CircleImage data-color={currentColor} className={clsx(s.image, s.desktop)} />
            <CircleSmallImage data-color={currentColor} className={clsx(s.image, s.mobile)} />
        </Paper>
    );
};
