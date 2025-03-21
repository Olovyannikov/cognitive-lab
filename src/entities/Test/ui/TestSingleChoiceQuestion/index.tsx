import { useEffect } from 'react';
import { Paper, Radio, Stack } from '@mantine/core';

import { InputBorderless } from '@/shared/ui';

import { useIsLarge } from '../../../../shared/lib/hooks';
import type { QuestionsResponse } from '../../api/dto';
import type { SingleChoiceAnswer } from '../../types';
import { AnswerLabel } from '../AnswerLabel';
import { QuestionTitle } from '../TestQuestionTitle';

import s from './TestSingleChoiceQuestion.module.css';

interface TestSingleChoiceQuestionProps extends QuestionsResponse {
    value: SingleChoiceAnswer;
    onChange: (payload: {
        question: string;
        answer: { input?: string; value: string };
        index: number;
        isSingle: boolean;
    }) => void;
    page: number;
    showInput: boolean;
}

export const TestSingleChoiceQuestion = ({
    text,
    hint,
    id,
    value,
    onChange,
    page,
    options,
    showInput,
}: TestSingleChoiceQuestionProps) => {
    const isLarge = useIsLarge();

    useEffect(() => {
        if (!showInput) {
            onChange({
                question: id,
                answer: {
                    value: value?.value,
                },
                index: page - 1,
                isSingle: true,
            });
        }
    }, [showInput]);

    return (
        <Paper mb='5xl'>
            <QuestionTitle text={text} hint={hint} />
            <Stack gap='xs' className={s.stack}>
                <Radio.Group
                    name={id}
                    value={value?.value ?? ''}
                    onChange={(localVal) => {
                        onChange({
                            question: id,
                            answer: {
                                value: localVal,
                                input: value?.input,
                            },
                            index: page - 1,
                            isSingle: true,
                        });
                    }}
                >
                    <Stack gap='lg' className={s.wrapper}>
                        {options?.map((option) => (
                            <Radio
                                color='lime.8'
                                key={option.id}
                                value={option.id}
                                size={isLarge ? 'xl' : 'lg'}
                                label={<AnswerLabel>{option.text}</AnswerLabel>}
                            />
                        ))}
                    </Stack>
                </Radio.Group>
                {showInput && (
                    <InputBorderless
                        autoFocus
                        value={value?.input}
                        defaultValue={value?.input}
                        onChange={(e) => {
                            onChange({
                                question: id,
                                answer: {
                                    value: value.value,
                                    input: e.target.value,
                                },
                                index: page - 1,
                                isSingle: true,
                            });
                        }}
                    />
                )}
            </Stack>
        </Paper>
    );
};
