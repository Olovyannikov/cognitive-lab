import { Button, ButtonProps, Image } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps extends ButtonProps {
    mbti?: string;
    survey?: string;
}

export const BuyNowButton = ({ mbti, survey, h, radius, ...props }: BuyNowButtonProps) => {
    const { isMobile } = usePageContext();

    const height = isMobile ? 45 : 64;

    return (
        <Button
            component='a'
            className={s.button}
            h={h ?? height}
            radius={radius ?? 'md'}
            leftSection={survey ? <Image w={20} h={20} src='/images/key.webp' aria-hidden={true} alt='' /> : null}
            href={`/purchase/${survey ? `personal/${survey}` : ''}${mbti ?? ''}`}
            {...props}
        >
            {survey ? 'Купить полный отчет' : 'Купить сейчас'}
        </Button>
    );
};
