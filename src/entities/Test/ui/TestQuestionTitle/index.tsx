import { Group, Stack, Text, Title } from '@mantine/core';

import s from './TestQuestionTitle.module.css';

interface QuestionTitleProps {
    text: string;
    hint?: string;
}

export const QuestionTitle = ({ text, hint }: QuestionTitleProps) => (
    <Group className={s.wrapper} gap={0} align='start' wrap='nowrap'>
        <Stack gap='sm'>
            <Title classNames={s} order={4}>
                {text}
            </Title>
            <Text className={s.hint}>{hint}</Text>
        </Stack>
    </Group>
);
