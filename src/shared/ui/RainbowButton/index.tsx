import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';

import s from './RainbowButton.module.css';

interface RainbowButtonProps extends ButtonProps {
    href?: string;
}

export const RainbowButton = ({ children, href = '/test', className, ...props }: RainbowButtonProps) => {
    return (
        <Button
            component='a'
            href={href}
            size='sm'
            bg='dark.9'
            radius='md'
            className={clsx(s.shadow, className)}
            {...props}
        >
            {children}
        </Button>
    );
};
