import { Box, Image, Text, Title } from '@mantine/core';

import s from './About.module.css';

export const About = () => {
    return (
        <Box className={s.box} component='section'>
            <Title className={s.title} order={2}>
                О платформе <span>CognitiveLab</span>
            </Title>
            <Box className={s.grid}>
                <Text className={s.description}>
                    Это инновационный онлайн-сервис психологического тестирования, где классическая методика 16 типов
                    личности (MBTI) сочетается с передовыми AI-технологиями.
                </Text>
                <Text className={s.description}>
                    Узнайте, какие скрытые ресурсы в вас заложены и как их лучше всего применять для личностного роста
                    и&nbsp;карьерного развития.
                </Text>
                <Image
                    className={s.image}
                    src='/images/letter-main.jpg'
                    width={210}
                    height={223}
                    aria-hidden={true}
                    alt=''
                />
            </Box>
        </Box>
    );
};
