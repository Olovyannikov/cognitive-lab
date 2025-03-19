import { CreateReviewForm } from '@/features/CreateReviewForm';
import { NavigateToHelpPage } from '@/features/NavigateToHelpPage';

import { InnerLayout } from '@/widgets/InnerLayout';

export const ReviewPage = () => (
    <InnerLayout
        title='Оставьте отзыв'
        text='Поделитесь вашим мнением о прохождении теста. Будем рады услышать вас!'
        image='/review/question-bubble'
    >
        <CreateReviewForm
            slots={{
                action: <NavigateToHelpPage />,
            }}
        />
    </InnerLayout>
);
