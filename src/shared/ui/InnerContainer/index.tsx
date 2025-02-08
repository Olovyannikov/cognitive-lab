import { Container, ContainerProps } from '@mantine/core';
import clsx from 'clsx';

import s from './InnerContainer.module.css';

export const InnerContainer = ({ children, className, ...rest }: ContainerProps) => {
    return (
        <Container className={clsx(s.container, className)} {...rest}>
            {children}
        </Container>
    );
};
