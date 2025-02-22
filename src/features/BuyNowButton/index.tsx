import { Button } from '@mantine/core';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps {
    mbti?: string;
    survey?: string;
}

export const BuyNowButton = ({ mbti, survey }: BuyNowButtonProps) => {
    return (
        <Button
            component='a'
            color='dark.6'
            variant='filled'
            className={s.button}
            href={`/purchase/${survey ? `/personal/${survey}` : ''}${mbti ?? ''}`}
        >
            Купить сейчас
        </Button>
    );
};
