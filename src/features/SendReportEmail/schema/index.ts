import { z } from 'zod';

export const SendReportSchema = z.object({
    email: z.string().min(1, { message: 'Обязательное поле' }).email('Введите почту в формате example@mail.org'),
});
