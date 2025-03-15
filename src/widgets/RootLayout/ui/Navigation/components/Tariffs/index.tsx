import { useUnit } from 'effector-react';

import { RootModel } from '../../../../model';

import s from '../common.module.css';

export const Tariffs = () => {
    const onClose = useUnit(RootModel.allMenusClosed);
    return (
        <a className={s.link} href='#tariffs' onClick={() => onClose(false)}>
            Тарифы
        </a>
    );
};
