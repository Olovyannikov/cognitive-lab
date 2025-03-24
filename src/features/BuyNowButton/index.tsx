import { Button, type ButtonProps } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture } from '@/shared/ui';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps extends ButtonProps {
    mbti?: string;
    survey?: string;
}

export const BuyNowButton = ({ mbti, survey, h, radius, ...props }: BuyNowButtonProps) => {
    const {
        isMobile,
        routeParams: { reportId },
    } = usePageContext();

    const height = isMobile ? 45 : 64;

    const currentUrl = () => {
        let href = `/purchase/`;

        if (survey) {
            href += `${survey}`;
        }

        if (mbti) {
            href += `?type=${mbti}`;
        } else {
            href += `?reportId=${reportId}`;
        }

        return href;
    };

    return (
        <Button
            component='a'
            h={h ?? height}
            className={s.button}
            radius={radius ?? 'md'}
            href={currentUrl()}
            leftSection={survey ? <Picture w={20} h={20} src='/emoji/key' aria-hidden={true} alt='' /> : null}
            {...props}
        >
            {survey ? 'Купить полный отчет' : 'Купить сейчас'}
        </Button>
    );
};
