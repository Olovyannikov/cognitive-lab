import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { Box } from '@mantine/core';
import clsx from 'clsx';

import s from './Marquee.module.css';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
    className?: string;
    pauseOnHover?: boolean;
    repeat?: number;
}

export const Marquee = ({
    className,
    pauseOnHover = true,
    children,
    repeat = 1,
    ...props
}: PropsWithChildren<MarqueeProps>) => {
    return (
        <Box className={s.wrapper}>
            <Box
                {...props}
                className={clsx(s.root, s.row, className, {
                    [s.hasPause]: pauseOnHover,
                })}
            >
                {Array(repeat)
                    .fill(0)
                    .map((_, i) => (
                        <Box key={i} className={clsx(s.card)}>
                            {children}
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};
