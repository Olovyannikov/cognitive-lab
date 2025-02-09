import { Button, type ButtonProps } from '@mantine/core';

export const RedirectToTestPage = ({ ...props }: ButtonProps) => {
    return (
        <Button component='a' href='/test' fullWidth size='lg' radius='md' bg='dark.6' {...props}>
            Пройти тест
        </Button>
    );
};
