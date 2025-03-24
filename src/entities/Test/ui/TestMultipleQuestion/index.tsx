import { Checkbox, Paper, Stack } from '@mantine/core';

import { useIsLarge } from '@/shared/lib';
import { IconCheck, InputBorderless } from '@/shared/ui';

import type { QuestionsResponse } from '../../api/dto';
import type { MultiChoiceAnswer } from '../../api/types';
import { AnswerLabel } from '../AnswerLabel';
import { QuestionTitle } from '../TestQuestionTitle';
import { useMultipleQuestionViewModel } from './view-model';

import s from './TestMultipleQuestion.module.css';

interface TestMultipleQuestionProps extends QuestionsResponse {
    page: number;
    value: MultiChoiceAnswer[] | null;
    onChange: (payload: {
        question: string;
        answer: { input?: string; value: string }[];
        index: number;
        isMultiple: boolean;
    }) => void;
}

export const TestMultipleQuestion = ({ text, hint, options, onChange, value, page, id }: TestMultipleQuestionProps) => {
    const isLarge = useIsLarge();
    const { localValues, input, setLocalValues, setInput } = useMultipleQuestionViewModel({
        onChange,
        options,
        value,
        page,
        id,
    });

    const showInput = options && value?.map((el) => el.value)?.includes(options[options?.length - 1].id);

    return (
        <Paper mb='5xl'>
            <QuestionTitle text={text} hint={hint} />
            <Stack gap='xs' className={s.wrap}>
                <Checkbox.Group
                    value={localValues.length ? localValues : (value?.map((v) => v.value) ?? localValues)}
                    onChange={setLocalValues}
                >
                    <Stack gap='lg' className={s.checkboxWrapper}>
                        {options?.map((option) => (
                            <Checkbox
                                size={isLarge ? '32px' : 'lg'}
                                radius='xs'
                                color='lime.8'
                                key={option.id}
                                label={<AnswerLabel>{option.text}</AnswerLabel>}
                                value={option.id}
                                icon={IconCheck}
                            />
                        ))}
                    </Stack>
                </Checkbox.Group>
                {showInput && (
                    <InputBorderless
                        value={input.length > 0 ? input : value?.find((el) => el.input)?.input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                )}
            </Stack>
        </Paper>
    );
};
