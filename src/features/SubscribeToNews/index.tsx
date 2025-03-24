import { useEffect } from 'react';
import { Button, Flex, FocusTrap, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';
import { zodResolver } from 'mantine-form-zod-resolver';

import { subscribeToNewsMutation } from '@/features/SubscribeToNews/api';

import { SubscribeToNewsModel } from './model';
import { SubscribeToNewsSchema } from './schema';

import s from './SubscribeToNews.module.css';

export const SubscribeToNews = () => {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            email: '',
        },
        validate: zodResolver(SubscribeToNewsSchema),
    });
    const [onFormSubmit, isLoading, isSucceeded] = useUnit([
        SubscribeToNewsModel.formSubmitted,
        subscribeToNewsMutation.$pending,
        subscribeToNewsMutation.$succeeded,
    ]);

    useEffect(() => {
        if (isLoading || !isSucceeded) return;
        form.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isSucceeded]);

    const onSubmit = form.onSubmit((data) => {
        onFormSubmit(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <Title className={s.title} order={6}>
                Новости на почту
            </Title>
            <Flex className={s.flex} gap='sm'>
                <FocusTrap active={Boolean(form.errors.email)}>
                    <TextInput
                        inputMode='email'
                        placeholder='info@mail.ru'
                        {...form.getInputProps('email')}
                        key={form.key('email')}
                    />
                </FocusTrap>
                <Button loading={isLoading} disabled={isLoading} color='dark.6' fullWidth type='submit'>
                    Подписаться
                </Button>
            </Flex>
        </form>
    );
};
