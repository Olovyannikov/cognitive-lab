import { useUnit } from 'effector-react';

import { ReviewModel } from '@/entities/Review';

import { CreateReviewForm } from '@/features/CreateReviewForm';
import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import { InnerLayout } from '@/widgets/InnerLayout';

export const ReviewPage = () => {
    const [isSubmitted] = useUnit([ReviewModel.$isFormSubmittedSuccessfully]);

    return (
        <InnerLayout
            title={isSubmitted ? 'Спасибо за отзыв' : 'Оставьте отзыв'}
            text={
                isSubmitted
                    ? 'Благодарим вас за то, что поделились своим мнением! \n' +
                      'Мы высоко ценим любую обратную связь и стараемся использовать её для улучшения нашего сервиса.'
                    : 'Поделитесь вашим мнением о прохождении теста. Будем рады услышать вас!'
            }
            image={isSubmitted ? '/review/star' : '/review/question-bubble'}
        >
            {!isSubmitted && (
                <CreateReviewForm
                    slots={{
                        action: <NavigateToHelpPage />,
                    }}
                />
            )}
            {isSubmitted && <>Спасибо за отзыв!</>}
        </InnerLayout>
    );
};
