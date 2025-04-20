import { type ReactNode, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';

import s from './StickyScrollReveal.module.css';

export const StickyScrollReveal = ({
    content,
    contentClassName,
    titleClassName,
    descriptionClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: ReactNode;
    }[];
    contentClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        target: ref,
        // container: ref,
        offset: ['start start', 'end start'],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const cardsBreakpoints = content.map((_, index) => (index * 2) / cardLength / 2);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance <= Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });

    return (
        <motion.div className={s.wrapper} ref={ref}>
            <div className={s.items}>
                <div className={s.container}>
                    {content.map((item, index) => (
                        <div key={item.title + index} className={s.item}>
                            <motion.h2
                                data-index={index}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className={clsx(s.title, titleClassName)}
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className={clsx(s.description, descriptionClassName)}
                            >
                                {item.description}
                            </motion.p>
                            <div
                                style={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className={clsx(s.mobile)}
                            >
                                {content[index].content ?? null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={clsx(s.content, contentClassName)}>{content[activeCard].content ?? null}</div>
        </motion.div>
    );
};
