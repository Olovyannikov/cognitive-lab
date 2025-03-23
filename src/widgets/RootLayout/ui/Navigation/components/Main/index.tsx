import { useUnit } from 'effector-react';

import { RootModel } from '../../../../model';

import s from '../common.module.css';

export const Main = () => {
    const onClose = useUnit(RootModel.allMenusClosed);

    return (
        <a className={s.link} href='/' onClick={() => onClose(false)}>
            Главная
        </a>
    );
};
