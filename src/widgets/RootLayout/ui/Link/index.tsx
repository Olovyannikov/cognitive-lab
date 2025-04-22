import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

import s from './Link.module.css';

interface LinkProps {
    href: string;
    className?: string;
    onClick?: VoidFunction;
}

export const Link = ({ children, className, ...props }: PropsWithChildren<LinkProps>) => (
    <a className={clsx(s.link, className)} {...props}>
        {children}
    </a>
);
