import type { ComponentType } from 'react';
import { variant } from '@effector/reflect';
import { Button } from '@mantine/core';
import { ArrowsClockwise } from '@phosphor-icons/react';

import { isExists } from '@/shared/lib';

import { RephrasingModel } from './model';

import s from './Rephrasing.module.css';

export const Rephrasing = variant({
    if: RephrasingModel.$currentPhrases.map(({ texts, hints }) => isExists(texts, 1) && isExists(hints, 1)),
    then: Button as ComponentType,
    else: undefined,
    bind: {
        fz: 16,
        c: 'dark.9',
        color: 'dark.9',
        display: 'flex',
        variant: 'subtle',
        className: s.root,
        children: 'Перефразировать',
        leftSection: <ArrowsClockwise size={18} />,
        onClick: RephrasingModel.changePhraseIndex,
    },
});
