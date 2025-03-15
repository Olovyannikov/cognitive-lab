import { useUnit } from 'effector-react';

import { RootModel } from '../../../../model';
import s from '../common.module.css';

export const Faq = () => {
    const onClose = useUnit(RootModel.allMenusClosed);
    return (
        <a className={s.link} href='/faq' onClick={() => onClose(false)}>
            Ответы на вопросы
        </a>
    );
};
