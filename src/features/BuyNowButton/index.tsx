import { Button } from '@mantine/core';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps {
    mbti: string;
}

export const BuyNowButton = ({ mbti }: BuyNowButtonProps) => {
    return (
        <Button
            component='a'
            color='dark.6'
            variant='filled'
            className={s.button}
            href={`/purchase-report?mbti=${mbti}`}
        >
            Купить сейчас
        </Button>
    );
};
