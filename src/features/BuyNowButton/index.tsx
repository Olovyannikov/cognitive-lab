import { Button, type ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture } from '@/shared/ui';

import s from './BuyNowButton.module.css';

interface BuyNowButtonProps extends ButtonProps {
    mbti?: string;
    survey?: string | null;
    externalReportId?: string;
    showIcon?: boolean;
}

export const BuyNowButton = ({
    externalReportId,
    mbti,
    survey,
    h,
    radius,
    className,
    children,
    showIcon = false,
    ...props
}: BuyNowButtonProps) => {
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
        } else if (reportId || externalReportId) {
            href += `?reportId=${reportId || externalReportId}`;
        }

        return href;
    };

    const getChildren = () => {
        if (children) {
            return children;
        }

        if (survey) {
            return 'Купить полный отчет';
        }

        return 'Купить сейчас';
    };

    return (
        <Button
            component='a'
            h={h ?? height}
            className={clsx(s.button, className)}
            radius={radius ?? 'md'}
            href={currentUrl()}
            leftSection={showIcon ? <Picture w={20} h={20} src='/emoji/key' aria-hidden={true} alt='' /> : null}
            {...props}
        >
            {getChildren()}
        </Button>
    );
};
