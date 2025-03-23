import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useUnit } from 'effector-react';

import { getSurveysInfoQuery } from '@/entities/Report';

import { HelpFormModel } from '../model';

export const useHelpFormViewModel = () => {
    const submitFormHandler = useUnit(HelpFormModel.submitHelpForm);
    const user = useUnit(getSurveysInfoQuery.$data);

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: '',
            email: '',
            subject: '',
            text: '',
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Неправильный email'),
            text: (value: string) => (value.length > 0 ? null : 'Введите ваш вопрос'),
        },
    });

    useEffect(() => {
        if (!user) return;
        form.setFieldValue('email', user?.user?.email ?? '');
    }, [user]);

    const nameProps = {
        label: 'Имя',
        placeholder: 'Как к Вам обращаться?',
        key: form.key('name'),
        ...form.getInputProps('name'),
    };

    const emailProps = {
        label: 'Электронная почта',
        placeholder: 'name@mail.ru',
        withAsterisk: true,
        key: form.key('email'),
        ...form.getInputProps('email'),
    };

    const themeProps = {
        label: 'Тема вопроса',
        placeholder: 'С чем связан вопрос?',
        key: form.key('subject'),
        ...form.getInputProps('subject'),
    };

    const questionProps = {
        label: 'Ваш вопрос',
        placeholder: 'Принимаем вопросы, замечания, предложения',
        withAsterisk: true,
        key: form.key('text'),
        ...form.getInputProps('text'),
    };

    const onSubmit = form.onSubmit((data) => {
        submitFormHandler(data);
    });

    return {
        nameProps,
        emailProps,
        themeProps,
        questionProps,
        onSubmit,
    };
};
