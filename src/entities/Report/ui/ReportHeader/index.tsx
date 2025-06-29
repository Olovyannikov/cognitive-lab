import { Paper, Stack, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { usePageContext } from 'vike-react/usePageContext';

import CircleImage from '@/shared/assets/images/circle.svg?react';
import CircleSmallImage from '@/shared/assets/images/circle_small.svg?react';
import { Picture } from '@/shared/ui';

import s from './ReportHeader.module.css';

interface ReportHeaderProps {
    type: string;
    name: string;
    preTitle?: string;
    typeToColorMapper?: Record<string, string>;
}

export const ReportHeader = ({ type, name, preTitle = 'Ваш тип личности', typeToColorMapper }: ReportHeaderProps) => {
    const currentColor = typeToColorMapper?.[type];
    const { isMobile } = usePageContext();
    const currentName = name?.split('—')[1]?.replaceAll('»', '').replaceAll('«', '');

    return (
        <Paper className={s.paper} data-color={currentColor}>
            <Stack className={s.stack}>
                <Text className={s.personalityType}>{preTitle}</Text>
                <Title className={s.name}>{currentName ?? name}</Title>
            </Stack>
            <Picture
                cdn
                draggable={false}
                className={s.character}
                src={`/report/types/${isMobile ? 'mobile/' : ''}${type}`}
            />
            <CircleImage data-color={currentColor} className={clsx(s.image, s.desktop)} />
            <CircleSmallImage data-color={currentColor} className={clsx(s.image, s.mobile)} />
        </Paper>
    );
};
