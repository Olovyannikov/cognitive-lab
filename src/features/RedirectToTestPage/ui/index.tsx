import { Button, type ButtonProps } from '@mantine/core';
import clsx from 'clsx';

import s from './RedirectToTestPage.module.css';

export const RedirectToTestPage = ({ ...props }: ButtonProps & { onClick?: VoidFunction }) => (
    <Button
        component='a'
        href='/test'
        fullWidth
        size='lg'
        radius='md'
        bg='dark.6'
        className={clsx(props.className, s.button)}
        {...props}
    >
        Пройти тест
    </Button>
);
