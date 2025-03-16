import { Button } from '@mantine/core';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useUnit } from 'effector-react';

import { RephrasingModel } from './model';

import s from './Rephrasing.module.css';

export const Rephrasing = () => {
    const [onChangePhraseHandler] = useUnit([RephrasingModel.changePhraseIndex]);
    const [phrases] = useUnit([RephrasingModel.$currentPhrases]);

    if (phrases.hints.length <= 1 || phrases.texts.length <= 1) return null;

    return (
        <Button
            m='auto'
            c='dark.9'
            color='dark.9'
            display='flex'
            variant='subtle'
            className={s.root}
            onClick={onChangePhraseHandler}
            leftSection={<ArrowsClockwise size={18} />}
        >
            Перефразировать
        </Button>
    );
};
