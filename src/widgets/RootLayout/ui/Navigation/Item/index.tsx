import type { PropsWithChildren } from 'react';
import { Box } from '@mantine/core';

interface ItemProps {
    id: number;
    label: string;
    link: string;
}

export const Item = ({ id, link, label }: PropsWithChildren<ItemProps>) => {
    return (
        <Box key={id}>
            <a href={link}>{label}</a>
        </Box>
    );
};
