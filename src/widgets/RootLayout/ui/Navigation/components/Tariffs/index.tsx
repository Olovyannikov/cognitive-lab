import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { RootModel } from '@/entities/Root';

import s from '../common.module.css';

export const Tariffs = () => {
    const { urlPathname } = usePageContext();

    const isMainPage = urlPathname === '/';

    const onClose = useUnit(RootModel.allMenusClosed);
    return (
        <a className={s.link} href={isMainPage ? '#tariffs' : '/#tariffs'} onClick={() => onClose(false)}>
            Тарифы
        </a>
    );
};
