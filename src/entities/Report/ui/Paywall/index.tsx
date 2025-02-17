import type { ReactNode } from 'react';
import { Box, Button, Group, Image } from '@mantine/core';
import { useUnit } from 'effector-react';

import { desktop } from '@/shared/media';
import { PointsList } from '@/shared/ui';

import s from './Paywall.module.css';

interface PaywallProps {
    points?: string[];
    title?: string;
    button_text?: ReactNode;
}

export const Paywall = ({ points, button_text, title = 'Больше о Вас в полном отчете' }: PaywallProps) => {
    const [isLarge] = useUnit([desktop.$matches]);

    return (
        <Box className={s.wrapper}>
            <Group wrap='nowrap' gap='xs' className={s.top}>
                <Image w='3xl' h='3xl' src='/images/lock.webp' />
                <h3>{title}</h3>
            </Group>
            <Image className={s.paywallMan} src={`/images/paywall-man${isLarge ? '_large' : ''}.webp`} />
            <PointsList className={s.points} points={points} />
            <Box className={s.actions}>
                <Button
                    size='lg'
                    radius='md'
                    color='dark.6'
                    component='a'
                    href='/purchase'
                    leftSection={<Image w={20} h={20} src='/images/key.webp' aria-hidden={true} alt='' />}
                >
                    {button_text}
                </Button>
            </Box>
        </Box>
    );
};
