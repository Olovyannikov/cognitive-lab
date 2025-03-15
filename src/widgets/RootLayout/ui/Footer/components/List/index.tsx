import type { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

import s from './List.module.css';

interface ListProps extends ComponentProps<'ul'> {
    data: {
        id: number;
        label: ReactNode;
        icon?: ReactNode;
    }[];
}

export const List = ({ data, className }: ListProps) => {
    return (
        <ul className={clsx(s.list, className)}>
            {data?.map((item) => (
                <li key={item.id}>
                    {item.icon}
                    {item.label}
                </li>
            ))}
        </ul>
    );
};
