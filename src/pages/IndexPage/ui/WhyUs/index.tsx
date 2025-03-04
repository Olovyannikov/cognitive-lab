import { useEffect, useRef, useState } from 'react';
import { Box, Button, Image, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Section } from '../Section';
import { CARDS } from './const';
import s from './WhyUs.module.css';

export const WhyUs = () => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerStart = containerRef.current?.getBoundingClientRect().y;

            if (containerStart > -200) {
                setActiveCardIndex(0);
            }

            if (containerStart < -300) {
                setActiveCardIndex(1);
            }

            if (containerStart < -600) {
                setActiveCardIndex(2);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Section ref={containerRef} className={s.root} containerClassName={s.container}>
            <Title order={2} className={s.title} ta='center'>
                Почему стоит выбрать тестирование в&nbsp;
                <Text span c='violet'>
                    CognitiveLab?
                </Text>
            </Title>
            <Box className={s.content}>
                {CARDS.map((card, index) => (
                    <motion.div
                        key={index}
                        className={s.card}
                        initial={{ opacity: index === 0 ? 1 : 0 }}
                        animate={{
                            opacity: index === activeCardIndex ? 1 : 0,
                        }}
                        transition={{
                            opacity: { duration: 0.5 },
                        }}
                    >
                        <Title order={5} className={clsx(s.cardTitle, s[index])}>
                            {card.label}
                        </Title>
                        <Text className={s.cardDescription}>{card.description}</Text>
                        <Image className={s.cardImage} src={card.image} alt={card.label} width={280} height={280} />
                    </motion.div>
                ))}
            </Box>
            <Button variant='transparent' className={s.control} component='a' href='/'>
                Пройти тест
            </Button>
        </Section>
    );
};
