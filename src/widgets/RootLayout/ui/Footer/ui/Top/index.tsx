import { Box } from '@mantine/core';

import CognitiveLogo from '@/app/assets/images/cognitive-logo.svg?react';

import { OWNER_INFO } from '../../const';
import { List } from '../List';
import s from './Top.module.css';

export const Top = () => {
    return (
        <Box className={s.top}>
            <CognitiveLogo width={200} height={35} />

            <p>Технологии самопознания</p>
            <List className={s.owner} data={OWNER_INFO} />
        </Box>
    );
};
