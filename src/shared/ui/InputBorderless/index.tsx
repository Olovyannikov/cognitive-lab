import { TextInput, TextInputProps } from '@mantine/core';

import s from './InputBorderless.module.css';

type InputBorderless = TextInputProps;

export const InputBorderless = ({ value, onChange }: InputBorderless) => (
    <TextInput fz={16} autoFocus classNames={s} value={value} onChange={onChange} />
);
