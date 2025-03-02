import { Button, Divider, List, Paper, Text, Title } from '@mantine/core';
import { Check } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { isNumber } from 'lodash-es';

import s from './Tariff.module.css';

interface TariffProps {
    title: string;
    description: string;
    price: number | string;
    features: {
        title: string;
        description: string;
    }[];
    isFull?: boolean;
    buyNow?: boolean;
}

export const Tariff = ({ title, features, price, description, isFull = false, buyNow = false }: TariffProps) => {
    return (
        <Paper className={clsx(s.tariff, isFull && s.full)}>
            <Title order={5}>{title}</Title>
            <Text>{description}</Text>
            <Text className={clsx(s.price, isNumber(price) && s.num)} fw='bold'>
                {price}
            </Text>
            <Divider />
            <List className={s.list} icon={<Check weight='bold' size={24} />}>
                {features?.map((item) => (
                    <List.Item key={item.title}>
                        <Text span fw='600'>
                            {item.title}
                        </Text>
                        <Text span>{item.description}</Text>
                    </List.Item>
                ))}
            </List>
            <Button component='a' href={buyNow ? '/types' : '/test'} variant='subtle' className={s.button}>
                {buyNow ? 'Купить сейчас' : 'Пройти тест'}
            </Button>
        </Paper>
    );
};
