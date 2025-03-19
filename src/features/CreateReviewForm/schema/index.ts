import { z } from 'zod';

export const CreateReviewFormSchema = z.object({
    name: z.string().min(1, { message: 'Имя обязательно' }),
    text: z.string().min(1, { message: 'Текст отзыва обязателен' }),
});
