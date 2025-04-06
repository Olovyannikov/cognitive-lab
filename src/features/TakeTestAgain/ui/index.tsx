import { reflect } from '@effector/reflect';
import { Button } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';

import { TakeTestAgainModel } from '../model';

export const TakeTestAgain = reflect({
    view: Button<'button'>,
    bind: {
        size: 'md',
        variant: 'default',
        children: 'Пройти тест заново',
        leftSection: <ArrowClockwise size={20} />,
        onClick: TakeTestAgainModel.takeTestAgainClicked,
    },
});
