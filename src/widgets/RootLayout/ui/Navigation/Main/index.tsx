import { useUnit } from 'effector-react';

import { RootModel } from '@/entities/Root';

import { Link } from '../../Link';

export const Main = () => {
    const onClose = useUnit(RootModel.allMenusClosed);

    return (
        <Link href='/' onClick={() => onClose(false)}>
            Главная
        </Link>
    );
};
