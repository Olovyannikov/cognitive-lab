import { Title } from '@mantine/core';

interface SubtitleProps {
    text: string;
    type: string;
}

import s from './Subtitle.module.css';

export const Subtitle = ({ type, text }: SubtitleProps) => (
    <Title data-type={type} className={s.subtitle} order={3} mb='md'>
        {text}
    </Title>
);
