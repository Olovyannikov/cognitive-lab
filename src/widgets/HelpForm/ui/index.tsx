import { Button, Textarea } from '@mantine/core';
import { useUnit } from 'effector-react';

import { FormInput, FormWrapper } from '@/shared/ui';

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
            <Button disabled={pending} loading={pending} type='submit' fullWidth>
                Отправить
            </Button>
        </FormWrapper>
    );
};
