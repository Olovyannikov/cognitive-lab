import { reflect } from '@effector/reflect';
import { Box } from '@mantine/core';

import { RootModel } from '@/entities/Root';

import s from '../common.module.css';

export const Faq = reflect({
    view: Box<'a'>,
    bind: {
        href: '/faq',
        component: 'a',
        className: s.link,
        children: 'Ответы на вопросы',
        onClick: () => RootModel.allMenusClosed(false),
    },
});
