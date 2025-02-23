import { Paper } from '@mantine/core';

import { Paragraph } from '@/entities/Report';

import s from './TextStrokeDash.module.css';

interface TextStrokeDashProps {
    text: string;
}

export const TextStrokeDash = ({ text }: TextStrokeDashProps) => {
    return (
        <Paper className={s.paper}>
            <Paragraph fz={22} text={text} />
        </Paper>
    );
};
