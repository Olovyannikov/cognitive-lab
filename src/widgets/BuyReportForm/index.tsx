import { Button, Flex, Paper, Text, TextInput } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { FormInput, FormWrapper, MainButton } from '@/shared/ui';

import { getPriceWithPromocodeQuery } from '@/entities/Report';

import { toInputUppercase } from '../../shared/lib';
import {
    $promocodeErrorMessage,
    $showSuccessPromoMessage,
    applyPromocodeClicked,
    BuyReportGate,
    openTransactionPaywallFx,
} from './model';
import { useReportBuyFormViewModel } from './view-model';

import s from './BuyReportForm.module.css';

export const BuyReportForm = () => {
    useGate(BuyReportGate);
    const { pending } = useUnit(getPriceWithPromocodeQuery);
    const { onSubmit, promocodeProps, emailProps, form } = useReportBuyFormViewModel();

    const { applyPromoHandler, promocodeError, showSuccessMessage, isLoading } = useUnit({
        applyPromoHandler: applyPromocodeClicked,
        promocodeError: $promocodeErrorMessage,
        showSuccessMessage: $showSuccessPromoMessage,
        isLoading: openTransactionPaywallFx.pending,
    });

    return (
        <FormWrapper onSubmit={onSubmit}>
            <FormInput {...emailProps} />
            <Paper bg='gray.0' radius='xs' p='md' px='sm'>
                <Text className={s.promocodeLabel}>У меня есть промокод</Text>
                <Flex className={s.promocodeWrapper}>
                    <TextInput
                        {...promocodeProps}
                        disabled={pending || isLoading}
                        error={promocodeError}
                        onInput={toInputUppercase}
                        data-success={showSuccessMessage}
                        description={showSuccessMessage ? 'Промокод применен' : ''}
                        inputWrapperOrder={['label', 'input', 'description', 'error']}
                    />
                    <Button
                        fullWidth
                        c='dark.7'
                        radius='xs'
                        color='dark.7'
                        variant='outline'
                        disabled={pending || isLoading}
                        loading={pending || isLoading}
                        onClick={() => applyPromoHandler(form.values.promo_code.toUpperCase())}
                    >
                        Применить
                    </Button>
                </Flex>
            </Paper>
            <MainButton disabled={pending || isLoading} radius='xs' size='md' type='submit'>
                Перейти к оплате
            </MainButton>
            <Text fz={12} ta='center' mb={12}>
                Нажимая на кнопку, вы подтверждаете свое согласие на сбор, хранение и использование ваших персональных
                данных согласно{' '}
                <Text
                    fz={12}
                    c='blue.7'
                    component='a'
                    href='https://storage.yandexcloud.net/cognitive-lab-public/%D0%9F%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8.pdf'
                >
                    Политике конфиденциальности
                </Text>{' '}
                и принимаете условия{' '}
                <Text
                    fz={12}
                    c='blue.7'
                    component='a'
                    href='https://storage.yandexcloud.net/cognitive-lab-public/%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%20%D0%BE%D1%84%D0%B5%D1%80%D1%82%D1%8B.pdf'
                >
                    Публичной оферты
                </Text>
            </Text>
        </FormWrapper>
    );
};
