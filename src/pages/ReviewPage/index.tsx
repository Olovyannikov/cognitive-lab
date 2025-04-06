import { useUnit } from 'effector-react';

import { navigate } from '@/shared/lib';
import { FormSuccessScreen, PageLoader } from '@/shared/ui';

import { getSurveysInfoQuery } from '@/entities/Report';

import { CreateReviewForm, CreateReviewFormModel } from '@/features/CreateReviewForm';
import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';
import { NavigateToMainPage } from '@/features/NavigateToMainPage';

import { InnerLayout } from '@/widgets/InnerLayout';

export const ReviewPage = () => {
    const { pending, stale } = useUnit(getSurveysInfoQuery);

    const [isSubmitted] = useUnit([CreateReviewFormModel.$isSubmitted]);

    if (pending || stale) return <PageLoader />;

    return (
        <InnerLayout
            maw={850}
            title={!isSubmitted && 'Оставьте отзыв'}
            text={!isSubmitted && 'Поделитесь вашим мнением о прохождении теста. Будем рады услышать вас!'}
            image={!isSubmitted ? '/review/question-bubble' : undefined}
        >
            {!isSubmitted && (
                <CreateReviewForm
                    slots={{
                        action: <NavigateToHelpPage />,
                    }}
                />
            )}
            {isSubmitted && (
                <FormSuccessScreen
                    description='Благодарим вас за то, что поделились своим мнением! Мы высоко ценим любую обратную связь и стараемся использовать её для улучшения нашего сервиса.'
                    image='/review/star'
                    slots={{
                        action: (
                            <NavigateToMainPage onClick={() => navigate.back()} fullWidth>
                                Вернуться назад
                            </NavigateToMainPage>
                        ),
                    }}
                />
            )}
        </InnerLayout>
    );
};
