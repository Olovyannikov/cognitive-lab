import { Title, type TitleProps } from '@mantine/core';

import s from './Header.module.css';

interface HeaderProps extends TitleProps {
    text: string;
}

export const Header = ({ text, ...props }: HeaderProps) => (
    <Title className={s.title} order={5} {...props}>
        {text}
    </Title>
);
