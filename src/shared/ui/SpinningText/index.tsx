import type { CSSProperties } from 'react';
import { VisuallyHidden } from '@mantine/core';
import clsx from 'clsx';
import { motion, type Transition, type Variants } from 'motion/react';

import s from './SpinningText.module.css';

interface SpinningTextProps {
    children: string | string[];
    style?: CSSProperties;
    duration?: number;
    className?: string;
    reverse?: boolean;
    fontSize?: number;
    radius?: number;
    transition?: Transition;
    variants?: {
        container?: Variants;
        item?: Variants;
    };
}

const BASE_TRANSITION = {
    repeat: Infinity,
    ease: 'linear',
};

const BASE_ITEM_VARIANTS = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
    },
};

export const SpinningText = ({
    children,
    duration = 10,
    style,
    className,
    reverse = false,
    radius = 5,
    transition,
    variants,
}: SpinningTextProps) => {
    if (typeof children !== 'string' && !Array.isArray(children)) {
        throw new Error('children must be a string or an array of strings');
    }

    if (Array.isArray(children)) {
        if (!children.every((child) => typeof child === 'string')) {
            throw new Error('all elements in children array must be strings');
        }
        // eslint-disable-next-line no-param-reassign
        children = children.join('');
    }

    const letters = children.split('');
    letters.push(' ');

    const finalTransition = {
        ...BASE_TRANSITION,
        ...transition,
        duration: (transition as { duration?: number })?.duration ?? duration,
    };

    const containerVariants = {
        visible: { rotate: reverse ? -360 : 360 },
        ...variants?.container,
    };

    const itemVariants = {
        ...BASE_ITEM_VARIANTS,
        ...variants?.item,
    };

    return (
        <motion.div
            className={clsx(s.relative, className)}
            style={{
                ...style,
            }}
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            transition={finalTransition}
        >
            {letters.map((letter, index) => (
                <motion.span
                    aria-hidden='true'
                    key={`${index}-${letter}`}
                    variants={itemVariants}
                    className={s.letters}
                    style={{
                        '--index': index,
                        '--total': letters.length,
                        '--radius': radius,
                    }}
                >
                    {letter}
                </motion.span>
            ))}
            <VisuallyHidden>{children}</VisuallyHidden>
        </motion.div>
    );
};
