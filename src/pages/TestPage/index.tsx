// import type { ReactNode } from 'react';
import { useUnit } from 'effector-react';

// import { isArray } from 'lodash-es';
// import { PageLoader } from '@/shared/ui';
import {
    //     type SingleChoiceAnswer,
    //     takeTestAgainMutation,
    TestContainer,
    TestModel,
    //     TestMultipleQuestion,
    //     TestProgress,
    //     TestScaleQuestion,
    //     TestSingleChoiceQuestion,
} from '@/entities/Test';

// import { RephrasingModel } from '@/features/Rephrasing';
import { Controls, SubmitTestModal, TestSplashScreen } from '@/widgets/Test';

export const TestPage = () => {
    // const data = useUnit(TestModel.$questions);
    const [
        // page,
        // progress,
        // question,
        // value,
        isSplashScreen,
        // isLoading
    ] = useUnit([
        //     TestModel.$currentPage,
        //     TestModel.$currentProgress,
        //     TestModel.$currentQuestion,
        //     TestModel.$currentValue,
        TestModel.$isSplashScreenVisible,
        //     takeTestAgainMutation.$pending,
    ]);
    //
    // const onChange = useUnit(TestModel.scaleFormFieldChanged);
    //
    // const [phraseIndex, phrases] = useUnit([RephrasingModel.$currentPhraseIndex, RephrasingModel.$currentPhrases]);
    //
    // if (!data || !question) return null;
    // if (isLoading) return <PageLoader />;

    // const Map: Record<string, ReactNode> = {
    //     scale: (
    //         <TestScaleQuestion
    //             {...question}
    //             text={phrases.texts[phraseIndex] ?? ''}
    //             hint={phrases.hints[phraseIndex]}
    //             value={String(value)}
    //             page={page}
    //             onChange={onChange}
    //         />
    //     ),
    //     multiple_choice: question.options && (
    //         <TestMultipleQuestion
    //             {...question}
    //             text={phrases.texts[phraseIndex] ?? ''}
    //             hint={phrases.hints[phraseIndex]}
    //             page={page}
    //             onChange={onChange}
    //             value={isArray(value) ? value : null}
    //         />
    //     ),
    //     single_choice: question.options && (
    //         <TestSingleChoiceQuestion
    //             {...question}
    //             text={phrases.texts[phraseIndex] ?? ''}
    //             hint={phrases.hints[phraseIndex]}
    //             page={page}
    //             onChange={onChange}
    //             showInput={Boolean(
    //                 question.options.find((el) => el.id === (value as SingleChoiceAnswer)?.value)?.requires_input
    //             )}
    //             value={value as SingleChoiceAnswer}
    //         />
    //     ),
    // };

    if (isSplashScreen) return <TestSplashScreen />;

    return (
        <TestContainer>
            {/*<TestProgress value={progress} page={page} total={data.length} />*/}
            {/*{Map[question?.type]}*/}
            <Controls />
            <SubmitTestModal />
        </TestContainer>
    );
};
