import { z } from 'zod';

export const SubscribeToNewsSchema = z.object({
    email: z.string().min(1, { message: 'Обязательное поле' }).email('Введите почту в формате info@mail.org'),
});
