import { TextInput } from '@mantine/core';

import s from './FormInput.module.css';

export const FormInput = TextInput.withProps({
    classNames: s,
    size: 'md',
});
