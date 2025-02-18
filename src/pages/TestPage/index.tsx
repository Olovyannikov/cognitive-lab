import type { ReactNode } from 'react';
import { useUnit } from 'effector-react';

import { getQuestionsQuery, TestContainer, TestProgress, TestScaleQuestion } from '@/entities/Test';
import { TestModel } from '@/entities/Test/model';
import { Controls } from '@/widgets/Test';

export const TestPage = () => {
    const { data } = useUnit(getQuestionsQuery);
    const { page, progress, question, value } = useUnit({
        page: TestModel.$currentPage,
        progress: TestModel.$currentProgress,
        question: TestModel.$currentQuestion,
        value: TestModel.$currentValue,
    });

    const { onChange } = useUnit({
        onChange: TestModel.scaleFormFieldChanged,
    });

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
        // single_choice: question.options && (
        //     <SingleQuestion {...question} page={page} onChange={onChange} value={currentValue as SingleChoiceAnswer} />
        // ),
    };

    return (
        <TestContainer>
            <TestProgress value={progress} page={page} total={data.length} />
            {Map[question?.type]}
            <Controls />
        </TestContainer>
    );
};
