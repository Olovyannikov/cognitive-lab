import type { ReactNode } from 'react';
import { useForm } from '@effector-reform/react';
import { Box, Checkbox, Text, TextInput } from '@mantine/core';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import { useGate, useUnit } from 'effector-react';
import { isArray } from 'lodash-es';

import { useIsLarge } from '@/shared/lib';
import { PageLoader } from '@/shared/ui';

import {
    EmailFieldWrapper,
    type SingleChoiceAnswer,
    takeTestAgainMutation,
    TestContainer,
    TestEmailFormModel,
    TestModel,
    TestMultipleQuestion,
    TestProgress,
    TestScaleQuestion,
    TestSingleChoiceQuestion,
} from '@/entities/Test';

import { RephrasingModel } from '@/features/Rephrasing';

import { Controls, SubmitTestModal, TestSplashScreen } from '@/widgets/Test';

export const TestPage = () => {
    const isLarge = useIsLarge();

    useGate(TestModel.TestGate);
    const data = useUnit(TestModel.$questions);
    const [page, question, progress, value, isSplashScreen, isLoading] = useUnit([
        TestModel.$currentPage,
        TestModel.$currentQuestion,
        TestModel.$currentProgress,
        TestModel.$currentValue,
        TestModel.$isSplashScreenVisible,
        takeTestAgainMutation.$pending,
    ]);

    const onChange = useUnit(TestModel.scaleFormFieldChanged);

    const [phraseIndex, phrases] = useUnit([RephrasingModel.$currentPhraseIndex, RephrasingModel.$currentPhrases]);

    const { fields } = useForm(TestEmailFormModel.form);

    if (!data || !question) return null;
    if (isLoading) return <PageLoader />;

    const Map: Record<string, ReactNode> = {
        scale: (
            <TestScaleQuestion
                {...question}
                text={phrases.texts[phraseIndex] ?? ''}
                hint={phrases.hints[phraseIndex]}
                value={String(value)}
                page={page}
                onChange={onChange}
            />
        ),
        multiple_choice: question.options && (
            <TestMultipleQuestion
                {...question}
                text={phrases.texts[phraseIndex] ?? ''}
                hint={phrases.hints[phraseIndex]}
                page={page}
                onChange={onChange}
                value={isArray(value) ? value : null}
            />
        ),
        single_choice: question.options && (
            <TestSingleChoiceQuestion
                {...question}
                text={phrases.texts[phraseIndex] ?? ''}
                hint={phrases.hints[phraseIndex]}
                page={page}
                onChange={onChange}
                showInput={Boolean(
                    question.options.find((el) => el.id === (value as SingleChoiceAnswer)?.value)?.requires_input
                )}
                value={value as SingleChoiceAnswer}
            />
        ),
        email: (
            <EmailFieldWrapper
                {...question}
                text={phrases.texts[phraseIndex] ?? ''}
                hint={phrases.hints[phraseIndex] ?? ''}
            >
                <TextInput
                    size={isLarge ? 'xl' : 'md'}
                    placeholder='mymail.@mail.ru'
                    label='Введите Email для отчёта'
                    value={fields.email.value}
                    onChange={(e) => fields.email.onChange(e.target.value)}
                    leftSection={<EnvelopeSimple color='var(--mantine-color-gray-5)' size={isLarge ? 32 : 20} />}
                />
                <Checkbox
                    size={isLarge ? 'md' : 'sm'}
                    radius='xxs'
                    checked={fields.approve_subscription.value}
                    onChange={() => fields.approve_subscription.onChange(!fields.approve_subscription.value)}
                    label={
                        <Text
                            size={isLarge ? 'md' : 'sm'}
                            style={{
                                lineHeight: 'normal',
                            }}
                        >
                            Согласен(-на) на получение новостей, персональных акций и{' '}
                            <Box
                                td='none'
                                c='blue.7'
                                component='a'
                                target='_blank'
                                href='https://storage.yandexcloud.net/cognitive-lab-public/marketing.pdf'
                            >
                                рекламных материалов
                            </Box>{' '}
                            от CognitiveLab по электронной почте
                        </Text>
                    }
                    styles={{
                        label: {
                            paddingLeft: 'var(--mantine-spacing-xs)',
                        },
                    }}
                />
            </EmailFieldWrapper>
        ),
    };

    if (isSplashScreen) return <TestSplashScreen />;

    return (
        <TestContainer>
            <TestProgress value={progress} page={page} total={data.length} />
            {Map[question?.type]}
            <Controls />
            <SubmitTestModal />
        </TestContainer>
    );
};
