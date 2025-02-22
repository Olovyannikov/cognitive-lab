import { Title, type TitleProps } from '@mantine/core';

import s from './Header.module.css';

interface HeaderProps extends TitleProps {
    text: string;
}

export const Header = ({ text, c = 'violet', ...props }: HeaderProps) => {
    return (
        <Title className={s.title} order={5} c={c + '.9'} {...props}>
            {text}
        </Title>
    );
};
