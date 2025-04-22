import { useUnit } from 'effector-react';
import { usePageContext } from 'vike-react/usePageContext';

import { RootModel } from '@/entities/Root';

import { Link } from '../../Link';

export const Tariffs = () => {
    const { urlPathname } = usePageContext();

    const isMainPage = urlPathname === '/';

    const onClose = useUnit(RootModel.allMenusClosed);

    return (
        <Link href={isMainPage ? '#tariffs' : '/#tariffs'} onClick={() => onClose(false)}>
            Тарифы
        </Link>
    );
};
