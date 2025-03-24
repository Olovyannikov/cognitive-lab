import type { FormEventHandler, PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';

import s from './FormWrapper.module.css';

interface FormWrapperProps {
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const FormWrapper = ({ onSubmit, children }: PropsWithChildren<FormWrapperProps>) => (
    <form onSubmit={onSubmit}>
        <Stack className={s.stackWrapper}>{children}</Stack>
    </form>
);
