import { reflect } from '@effector/reflect';

import { RootModel } from '@/entities/Root';

import { Link } from '../../Link';

export const Faq = reflect({
    view: Link,
    bind: {
        href: '/faq',
        children: 'Ответы на вопросы',
        onClick: () => RootModel.allMenusClosed(false),
    },
});
