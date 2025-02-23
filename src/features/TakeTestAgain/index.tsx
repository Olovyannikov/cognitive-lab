import { Button } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';
import { useUnit } from 'effector-react';

import { TakeTestAgainModel } from './model';
import s from './TakeTestAgain.module.css';

export const TakeTestAgain = () => {
    const [onClick] = useUnit([TakeTestAgainModel.takeTestAgainClicked]);

    return (
        <Button
            size='md'
            c='dark.6'
            color='dark.6'
            bg='transparent'
            variant='default'
            onClick={onClick}
            className={s.button}
            leftSection={<ArrowClockwise size={20} weight='bold' />}
        >
            Пройти тест ещё раз
        </Button>
    );
};
