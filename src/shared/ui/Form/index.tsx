import type { FormEventHandler, PropsWithChildren } from 'react';
import { Stack } from '@mantine/core';

import s from './FormWrapper.module.css';

interface FormWrapperProps {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    className?: string;
}

export const FormWrapper = ({ onSubmit, className, children }: PropsWithChildren<FormWrapperProps>) => (
    <form onSubmit={onSubmit} className={className}>
        <Stack className={s.stackWrapper}>{children}</Stack>
    </form>
);
