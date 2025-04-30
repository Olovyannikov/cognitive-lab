import { Group, Stack, Text, Title } from '@mantine/core';
import clsx from 'clsx';

import s from './TestQuestionTitle.module.css';

interface QuestionTitleProps {
    text: string;
    hint?: string;
    fixed?: boolean;
}

export const QuestionTitle = ({ text, hint, fixed = false }: QuestionTitleProps) => (
    <Group className={clsx(s.wrapper, fixed && s.fixed)} gap={0} align='start' wrap='nowrap'>
        <Stack gap='sm'>
            <Title classNames={s} order={4}>
                {text}
            </Title>
            <Text className={s.hint}>{hint}</Text>
        </Stack>
    </Group>
);
