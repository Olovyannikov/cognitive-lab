import { Textarea } from '@mantine/core';
import { useUnit } from 'effector-react';

import { FormInput, FormWrapper, MainButton } from '@/shared/ui';

import { sendIssueMutation } from '../api';
import { useHelpFormViewModel } from '../view-model';

export const HelpForm = () => {
    const { pending } = useUnit(sendIssueMutation);
    const { nameProps, themeProps, emailProps, questionProps, onSubmit } = useHelpFormViewModel();

    return (
        <FormWrapper onSubmit={onSubmit}>
            <FormInput {...nameProps} disabled={pending} />
            <FormInput {...themeProps} disabled={pending} />
            <FormInput {...emailProps} disabled={pending} />
            <Textarea {...questionProps} disabled={pending} />
            <MainButton disabled={pending} loading={pending} type='submit' fullWidth>
                Отправить
            </MainButton>
        </FormWrapper>
    );
};
