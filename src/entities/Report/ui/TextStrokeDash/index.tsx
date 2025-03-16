import { Paper } from '@mantine/core';

import { Paragraph } from '@/entities/Report';

import s from './TextStrokeDash.module.css';

interface TextStrokeDashProps {
    text: string;
    color?: string;
}

export const TextStrokeDash = ({ text, color }: TextStrokeDashProps) => (
    <Paper data-color={color} className={s.paper}>
        <Paragraph fz={22} text={text} />
    </Paper>
);
