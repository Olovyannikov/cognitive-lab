import { Button, Flex, FocusTrap, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';
import { zodResolver } from 'mantine-form-zod-resolver';

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
    const [onFormSubmit] = useUnit([SubscribeToNewsModel.formSubmitted]);

    const onSubmit = form.onSubmit((data) => {
        onFormSubmit(data);

        // TODO: if form was submitted successfully
        form.reset();
    });

    return (
        <form onSubmit={onSubmit}>
            <Flex className={s.flex} gap='sm'>
                <FocusTrap active={Boolean(form.errors.email)}>
                    <TextInput
                        inputMode='email'
                        placeholder='info@mail.ru'
                        {...form.getInputProps('email')}
                        key={form.key('email')}
                    />
                </FocusTrap>
                <Button color='dark.6' fullWidth type='submit'>
                    Подписаться
                </Button>
            </Flex>
        </form>
    );
};
