import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';

import { RootModel } from '@/entities/Root';

import s from './Link.module.css';

interface LinkProps {
    href: string;
    className?: string;
    onClick?: VoidFunction;
}

export const Link = ({ children, className, ...props }: PropsWithChildren<LinkProps>) => {
    const [onCloseAllMenus] = useUnit([RootModel.allMenusClosed]);
    return (
        <a
            role='link'
            tabIndex={0}
            className={clsx(s.link, className)}
            onClick={() => onCloseAllMenus(false)}
            {...props}
        >
            {children}
        </a>
    );
};
