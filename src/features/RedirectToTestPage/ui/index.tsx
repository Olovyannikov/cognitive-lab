import { Loader, NavLink, NavLinkProps } from '@mantine/core';
import clsx from 'clsx';

import s from './RedirectToTestPage.module.css';

interface RedirectToTestPageProps {
    loading: boolean;
}

export const RedirectToTestPage = ({ loading, ...props }: NavLinkProps & RedirectToTestPageProps) => (
    <NavLink
        label={loading ? <Loader size='sm' /> : 'Пройти тест'}
        disabled={loading}
        miw={144}
        href='/test'
        bg='dark.6'
        {...props}
        className={clsx(props.className, s.button)}
        classNames={{
            body: s.body,
        }}
    />
);
