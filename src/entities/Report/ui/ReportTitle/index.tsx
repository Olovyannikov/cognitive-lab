import { Title, type TitleProps } from '@mantine/core';

import { useIsLarge } from '../../../../shared/lib/hooks';

export const ReportTitle = ({ children }: TitleProps) => {
    const isLarge = useIsLarge();

    return (
        <Title mb='md' data-type='title' fz={isLarge ? 24 : 20}>
            {children}
        </Title>
    );
};
