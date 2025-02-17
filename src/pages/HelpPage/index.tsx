import { Box, Stack, Text } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { MainButton } from '@/shared/ui';
import { HelpForm } from '@/widgets/HelpForm';
import { $isFormSent, HelpFormGate, sentFormChanged } from '@/widgets/HelpForm/model';
import { InnerLayout } from '@/widgets/InnerLayout';

export const HelpPage = () => {
    useGate(HelpFormGate);
    const [isFormSent, onSendNewFormHandler] = useUnit([$isFormSent, sentFormChanged]);

    return (
        <Box component='section'>
            <InnerLayout
                title={isFormSent ? 'Спасибо за ваш отзыв!' : 'Служба поддержки'}
                text={
                    isFormSent ? (
                        'Благодарим вас за то, что поделились своим мнением! Мы высоко ценим любую обратную связь и стараемся использовать её для улучшения нашего сервиса.'
                    ) : (
                        <>
                            Чтобы связаться с нами, заполните форму. Мы стараемся отвечать в течение часа, однако в
                            некоторых случаях это может занять больше времени. Самый быстрый способ получить ответ —
                            через{' '}
                            <Text
                                component='a'
                                c='blue.7'
                                td='underline'
                                target='_blank'
                                href='https://t.me/cognitivelab_ru'
                            >
                                Telegram
                            </Text>{' '}
                            или{' '}
                            <Text
                                td='underline'
                                component='a'
                                c='blue.7'
                                target='_blank'
                                href='https://api.whatsapp.com/send/?phone=79043330809'
                            >
                                WhatsApp
                            </Text>
                            .
                        </>
                    )
                }
                image={isFormSent ? '/images/success-base-man.webp' : '/images/paywall-man_large.webp'}
            >
                {isFormSent ? (
                    <Stack>
                        <MainButton component='a' href='/'>
                            На главную
                        </MainButton>
                        <MainButton bg='white' c='black' onClick={onSendNewFormHandler}>
                            Написать в поддержку
                        </MainButton>
                    </Stack>
                ) : (
                    <HelpForm />
                )}
            </InnerLayout>
        </Box>
    );
};
