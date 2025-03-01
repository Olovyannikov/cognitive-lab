import { useUnit } from 'effector-react';

import { RootModel } from '../../../../model';
import s from '../common.module.css';

export const Blog = () => {
    const onClose = useUnit(RootModel.allMenusClosed);

    return (
        <a className={s.link} href='/blog' onClick={() => onClose(false)}>
            Блог
        </a>
    );
};
