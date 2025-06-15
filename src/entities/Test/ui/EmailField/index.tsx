import type { PropsWithChildren } from 'react';
import { Paper, Stack } from '@mantine/core';

import { useIsLarge } from '@/shared/lib';

import type { QuestionsResponse } from '../../api/dto';
import { QuestionTitle } from '../TestQuestionTitle';

type EmailFieldWrapperProps = QuestionsResponse;

export const EmailFieldWrapper = ({
    text = 'Ваш Email',
    hint,
    children,
}: PropsWithChildren<EmailFieldWrapperProps>) => {
    const isLarge = useIsLarge();

    return (
        <Paper maw={588} mx='auto'>
            <QuestionTitle text={text} hint={hint} />
            <Stack gap={isLarge ? 'lg' : 'sm'}>{children}</Stack>
        </Paper>
    );
};
