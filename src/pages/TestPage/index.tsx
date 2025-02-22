import type { ReactNode } from 'react';
import { useUnit } from 'effector-react';

import {
    getQuestionsQuery,
    type SingleChoiceAnswer,
    TestContainer,
    TestModel,
    TestProgress,
    TestScaleQuestion,
    TestSingleChoiceQuestion,
} from '@/entities/Test';
import { Controls } from '@/widgets/Test';

export const TestPage = () => {
    const { data } = useUnit(getQuestionsQuery);
    const [page, progress, question, value] = useUnit([
        TestModel.$currentPage,
        TestModel.$currentProgress,
        TestModel.$currentQuestion,
        TestModel.$currentValue,
    ]);

    const onChange = useUnit(TestModel.scaleFormFieldChanged);

    if (!data || !question) return null;

    const Map: Record<string, ReactNode> = {
        scale: <TestScaleQuestion {...question} value={String(value)} page={page} onChange={onChange} />,
        // multiple_choice: question.options && (
        //     <MultipleQuestion
        //         {...question}
        //         page={page}
        //         onChange={onChange}
        //         value={isArray(currentValue) ? currentValue : null}
        //     />
        // ),
        single_choice: question.options && (
            <TestSingleChoiceQuestion
                {...question}
                page={page}
                onChange={onChange}
                showInput={Boolean(
                    question.options.find((el) => el.id === (value as SingleChoiceAnswer)?.value)?.requires_input
                )}
                value={value as SingleChoiceAnswer}
            />
        ),
    };

    return (
        <TestContainer>
            <TestProgress value={progress} page={page} total={data.length} />
            {Map[question?.type]}
            <Controls />
        </TestContainer>
    );
};
