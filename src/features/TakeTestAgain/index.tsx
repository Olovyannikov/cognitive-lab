import type { ComponentType } from 'react';
import { reflect } from '@effector/reflect';
import { Button, type ButtonProps } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

import { TakeTestAgainModel } from './model';

import s from './TakeTestAgain.module.css';

export const TakeTestAgain = reflect({
    view: Button as ComponentType<ButtonProps>,
    bind: {
        size: 'md',
        c: 'dark.6',
        color: 'dark.6',
        bg: 'transparent',
        variant: 'default',
        children: 'Пройти тест ещё раз',
        leftSection: <ArrowClockwise size={20} weight='bold' />,
        className: s.button,
        onClick: TakeTestAgainModel.takeTestAgainClicked,
    },
});
