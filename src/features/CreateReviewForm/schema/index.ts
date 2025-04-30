import { z } from 'zod';

export const CreateReviewFormSchema = z.object({
    name: z.string().min(1, { message: 'Имя обязательно' }),
    text: z.string().min(1, { message: 'Текст отзыва обязателен' }),
    informativeness_rate: z.number().min(1, { message: 'Поле обязательно' }),
    convenience_rate: z.number().min(1, { message: 'Поле обязательно' }),
    accuracy_rate: z.number().min(1, { message: 'Поле обязательно' }),
    recommendability_rate: z.number().min(1, { message: 'Поле обязательно' }),
    satisfaction_rate: z.number().min(1, { message: 'Поле обязательно' }),
});
