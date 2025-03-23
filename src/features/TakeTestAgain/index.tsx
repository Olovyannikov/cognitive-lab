import { reflect } from '@effector/reflect';
import { Button } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

import { TakeTestAgainModel } from './model';

import s from './TakeTestAgain.module.css';

export const TakeTestAgain = reflect({
    view: Button<'button'>,
    bind: {
        size: 'md',
        c: 'dark.6',
        color: 'dark.6',
        bg: 'transparent',
        variant: 'default',
        className: s.button,
        children: 'Пройти тест ещё раз',
        onClick: TakeTestAgainModel.takeTestAgainClicked,
        leftSection: <ArrowClockwise size={20} weight='bold' />,
    },
});
