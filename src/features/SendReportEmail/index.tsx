import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';
import { zodResolver } from 'mantine-form-zod-resolver';

import { useIsLarge } from '@/shared/hooks';
import { InnerContainer } from '@/shared/ui';

import { sendFreeReportOnEmailMutation } from './api';
import { SendReportEmailModel } from './model';
import { SendReportSchema } from './schema';

import s from './SendReportEmail.module.css';

interface SendReportEmailProps {
    isFreeReport?: boolean;
    type?: 'block' | 'text';
}

export const SendReportEmail = ({ isFreeReport = true, type = 'text' }: SendReportEmailProps) => {
    const isLarge = useIsLarge();
    const { pending: isLoading } = useUnit(sendFreeReportOnEmailMutation);
    const [sendForm] = useUnit([SendReportEmailModel.submitForm]);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
        },
        validate: zodResolver(SendReportSchema),
    });

    const onSubmit = form.onSubmit((data) => {
        sendForm(data);
    });

    return (
        <InnerContainer className={type === 'block' ? s.container : ''}>
            <form onSubmit={isFreeReport ? onSubmit : () => {}}>
                <Flex className={s.wrapper}>
                    {type === 'text' && (
                        <Text fw='bold' visibleFrom='md' fz={24}>
                            Отправьте отчет на почту
                        </Text>
                    )}
                    <TextInput
                        inputMode='email'
                        disabled={isLoading}
                        placeholder='name@mail.ru'
                        key={form.key('email')}
                        miw={isLarge ? 514 : '100%'}
                        ml={type === 'text' ? 'auto' : 0}
                        size={type === 'block' ? 'lg' : 'md'}
                        bg={type === 'block' ? 'violet.0' : 'white'}
                        {...form.getInputProps('email')}
                    />
                    <Button
                        type='submit'
                        color='dark.7'
                        loading={isLoading}
                        fullWidth={!isLarge}
                        disabled={isLoading}
                        size={type === 'block' ? 'lg' : 'md'}
                        leftSection={<EnvelopeSimple size={20} />}
                        variant={type === 'block' ? 'filled' : 'outline'}
                        c={type === 'block' && !isLoading ? 'white' : 'dark.7'}
                    >
                        {isLarge ? 'Отправить' : 'Отправить отчет на почту'}
                    </Button>
                </Flex>
            </form>
        </InnerContainer>
    );
};
