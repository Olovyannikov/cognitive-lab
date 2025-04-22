import { reflect } from '@effector/reflect';

import { RootModel } from '@/entities/Root';

import { Link } from '../../Link';

export const Blog = reflect({
    view: Link,
    bind: {
        href: '/blog',
        children: 'Блог',
        onClick: () => RootModel.allMenusClosed(false),
    },
});
