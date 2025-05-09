import { Box, Button, Stack, Text } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { NavigateToMainPage } from '@/features/NavigateToMainPage';

import { HelpForm, HelpFormModel } from '@/widgets/HelpForm';
import { InnerLayout } from '@/widgets/InnerLayout';

export const HelpPage = () => {
    useGate(HelpFormModel.HelpFormGate);
    const [isFormSent, onSendNewFormHandler] = useUnit([HelpFormModel.$isFormSent, HelpFormModel.sentFormChanged]);

    return (
        <Box component='section'>
            <InnerLayout
                title={isFormSent ? 'Спасибо за ваше обращение!' : 'Служба поддержки'}
                text={
                    isFormSent ? (
                        'Наша команда рассмотрит ваш запрос и ответит вам в кратчайшие сроки.'
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
                image={isFormSent ? '/payment/success' : '/helpdesk'}
            >
                {isFormSent ? (
                    <Stack>
                        <NavigateToMainPage />
                        <Button bg='white' c='black' onClick={onSendNewFormHandler}>
                            Написать в поддержку
                        </Button>
                    </Stack>
                ) : (
                    <HelpForm />
                )}
            </InnerLayout>
        </Box>
    );
};
