import { Button, ButtonProps, Image } from '@mantine/core';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps extends ButtonProps {
    mbti?: string;
    survey?: string;
}

export const BuyNowButton = ({ mbti, survey, ...props }: BuyNowButtonProps) => {
    return (
        <Button
            component='a'
            color='dark.6'
            variant='filled'
            className={s.button}
            leftSection={survey ? <Image w={20} h={20} src='/images/key.webp' aria-hidden={true} alt='' /> : null}
            href={`/purchase/${survey ? `personal/${survey}` : ''}${mbti ?? ''}`}
            {...props}
        >
            {survey ? 'Купить полный отчет' : 'Купить сейчас'}
        </Button>
    );
};
