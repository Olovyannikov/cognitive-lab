import { Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import s from './PriceInfo.module.css';

interface PriceInfoProps {
    regularPrice: number;
    promocodePrice?: number;
}

export const PriceInfo = ({ regularPrice, promocodePrice }: PriceInfoProps) => {
    const {
        urlParsed: {
            search: { type },
        },
    } = usePageContext();
    return (
        <Stack className={s.wrapper}>
            <Title className={s.title} order={2}>
                {type ? 'Экспресс-отчёт по вашему типу личности' : 'Полный отчет по вашему типу личности'}
            </Title>

            <Skeleton className={s.skeleton} hidden={Boolean(regularPrice)} radius='sm' />

            <Group gap='lg'>
                <Text
                    hidden={!regularPrice}
                    className={s.price}
                    td={promocodePrice ? 'line-through' : ''}
                    c={promocodePrice ? 'dark.0' : 'dark.7'}
                >
                    {regularPrice}{' '}
                    <Text className={s.price} span ff='system-ui'>
                        ₽
                    </Text>
                </Text>

                <Text hidden={!promocodePrice} className={s.price} c='violet.8'>
                    {promocodePrice}{' '}
                    <Text className={s.price} span ff='system-ui'>
                        ₽
                    </Text>
                </Text>
            </Group>
        </Stack>
    );
};
