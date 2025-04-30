import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';
import { zodResolver } from 'mantine-form-zod-resolver';
import { usePageContext } from 'vike-react/usePageContext';

import { createReviewMutation, ReviewModel } from '@/entities/Review';

import { CreateReviewFormSchema } from '../schema';

export const useCreateReviewFormViewModel = () => {
    const {
        routeParams: { userReport },
    } = usePageContext();

    const [createReviewHandler, isSubmitted] = useUnit([
        ReviewModel.reviewCreated,
        ReviewModel.$isFormSubmittedSuccessfully,
    ]);
    const isLoading = useUnit(createReviewMutation.$pending);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            text: '',
            user_report: userReport ?? '',
            informativeness_rate: 0,
            convenience_rate: 0,
            accuracy_rate: 0,
            recommendability_rate: 0,
            satisfaction_rate: 0,
        },
        validate: zodResolver(CreateReviewFormSchema),
    });

    const nameInputProps = {
        name: 'name',
        key: form.key('name'),
        label: 'Имя',
        placeholder: 'Как к вам обращаться?',
        ...form.getInputProps('name'),
    };

    const textInputProps = {
        name: 'text',
        key: form.key('text'),
        label: 'Ваш отзыв',
        placeholder: 'Опишите ваш опыт прохождения теста',
        ...form.getInputProps('text'),
    };

    const informativenessRateRatingProps = {
        name: 'informativeness_rate',
        key: form.key('informativeness_rate'),
        label: 'Полнота информации',
        ...form.getInputProps('informativeness_rate'),
    };

    const convenienceRateProps = {
        name: 'convenience_rate',
        key: form.key('convenience_rate'),
        label: 'Удобство прохождения',
        ...form.getInputProps('convenience_rate'),
    };

    const accuracyRateProps = {
        name: 'accuracy_rate',
        key: form.key('accuracy_rate'),
        label: 'Точность результатов',
        ...form.getInputProps('accuracy_rate'),
    };

    const recommendabilityRateProps = {
        name: 'recommendability_rate',
        key: form.key('recommendability_rate'),
        label: 'Готовность рекомендовать друзьям',
        ...form.getInputProps('recommendability_rate'),
    };

    const satisfactionRateProps = {
        name: 'satisfaction_rate',
        key: form.key('satisfaction_rate'),
        label: 'Удовлетворенность результатом',
        ...form.getInputProps('satisfaction_rate'),
    };

    const onSubmit = form.onSubmit((data) => {
        createReviewHandler(data);
        if (isSubmitted) {
            form.reset();
        }
    });

    return {
        nameInputProps,
        textInputProps,
        informativenessRateRatingProps,
        convenienceRateProps,
        accuracyRateProps,
        recommendabilityRateProps,
        satisfactionRateProps,
        onSubmit,
        isLoading,
    };
};
