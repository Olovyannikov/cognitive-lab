import type { OrderStatus } from '../../types';
import { getStatusInfo } from '../statusInfo'; // Замените на актуальный путь

describe('getStatusInfo', () => {
    // Общие проверки для всех статусов, кроме 'paid'
    const testCases: (OrderStatus | undefined)[] = [undefined, 'pending', 'canceled_by_user', 'cancelled'];

    testCases.forEach((status) => {
        it(`должен возвращать информацию об ошибке для статуса: ${status || 'undefined'}`, () => {
            const result = getStatusInfo(status);

            expect(result).toEqual({
                title: 'Не получилось провести оплату.',
                text: 'К сожалению, ваша оплата не прошла успешно. Пожалуйста, попробуйте снова или обратитесь в нашу службу поддержки для решения этого вопроса. Мы всегда готовы помочь вам завершить процесс и предоставить доступ к вашим результатам.',
                buttonText: 'Повторить попытку оплаты',
                infoStatus: 'error',
            });
        });
    });

    it('должен возвращать информацию об успехе для статуса "paid"', () => {
        const result = getStatusInfo('paid');

        expect(result).toEqual({
            title: 'Оплата прошла успешно!',
            text: 'Вы можете перейти к своему отчету, просто нажав на кнопку ниже, либо воспользоваться ссылкой,которая была отправлена на ваш электронный адрес. Если у вас появятся вопросы или понадобится помощь, наша команда всегда на связи.',
            buttonText: 'Посмотреть полный отчет',
            infoStatus: 'success',
        });
    });

    it('должен корректно обрабатывать неизвестный статус', () => {
        // Тестируем с невалидным статусом (приводится к undefined)
        const result = getStatusInfo('unknown' as OrderStatus);

        expect(result).toEqual({
            title: 'Не получилось провести оплату.',
            text: 'К сожалению, ваша оплата не прошла успешно. Пожалуйста, попробуйте снова или обратитесь в нашу службу поддержки для решения этого вопроса. Мы всегда готовы помочь вам завершить процесс и предоставить доступ к вашим результатам.',
            buttonText: 'Повторить попытку оплаты',
            infoStatus: 'error',
        });
    });
});
