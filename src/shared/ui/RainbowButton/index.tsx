import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';

import s from './RainbowButton.module.css';

interface RainbowButtonProps extends ButtonProps {
    href?: string;
}

export const RainbowButton = ({ children, href = '/test', className, ...props }: RainbowButtonProps) => (
    <Button component='a' href={href} className={clsx(s.shadow, className)} {...props}>
        {children}
    </Button>
);
