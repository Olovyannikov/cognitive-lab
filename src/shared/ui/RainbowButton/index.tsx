import { Button } from '@mantine/core';
import clsx from 'clsx';

import s from './RainbowButton.module.css';

export const RainbowButton = Button.withProps({
    component: 'a',
    href: '/test',
    className: clsx(s.shadow),
});
