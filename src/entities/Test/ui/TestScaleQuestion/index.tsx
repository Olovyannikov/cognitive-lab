import { Flex, Paper, Radio, Stack, Text } from '@mantine/core';

import type { QuestionsResponse } from '../../api/dto';
import { SCALE_RADIO_ITEMS } from '../../constants';
import type { PreparedAnswer } from '../../types';
import { RadioElement } from '../RadioElement';
import { QuestionTitle } from '../TestQuestionTitle';

import s from './TestScaleQuestion.module.css';

interface TestScaleQuestionProps extends QuestionsResponse {
    onChange: (payload: PreparedAnswer) => void;
    page: number;
    value: string;
}

export const TestScaleQuestion = ({ value, page, text, hint, id, onChange }: TestScaleQuestionProps) => (
    <Paper className={s.wrapper}>
        <QuestionTitle text={text} hint={hint} />
        <Stack pos='relative' maw={1145} m='auto' gap='xs'>
            <Radio.Group
                className={s.group}
                name={id}
                value={value}
                onChange={(val) =>
                    onChange({
                        question: id,
                        answer: {
                            value: Number(val),
                        },
                        index: page - 1,
                    })
                }
            >
                <Flex className={s.radioWrapper} justify='space-between'>
                    {SCALE_RADIO_ITEMS.map((radio) => (
                        <RadioElement key={radio.value} size={radio.size} value={radio.value} />
                    ))}
                </Flex>
            </Radio.Group>
            <Flex className={s.agreedBlock} justify='space-between'>
                <Text className={s.agreed} c='indigo.8' fw={700}>
                    Не согласен
                </Text>
                <Text className={s.agreed} c='lime.8' fw={700}>
                    Согласен
                </Text>
            </Flex>
        </Stack>
    </Paper>
);
