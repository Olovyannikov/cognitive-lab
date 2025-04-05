import { Button, type ButtonProps } from '@mantine/core';
import { usePageContext } from 'vike-react/usePageContext';

import { Picture } from '@/shared/ui';

interface BuyNowButtonProps extends ButtonProps {
    mbti?: string;
    survey?: string | null;
    externalReportId?: string;
    showIcon?: boolean;
    onClick?: VoidFunction;
}

export const BuyNowButton = ({
    externalReportId,
    mbti,
    survey,
    className,
    children,
    showIcon = false,
    ...props
}: BuyNowButtonProps) => {
    const {
        routeParams: { reportId },
    } = usePageContext();

    const currentUrl = () => {
        let href = `/purchase`;

        if (survey) {
            href += `/${survey}`;
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
            size='md'
            component='a'
            href={currentUrl()}
            className={className}
            leftSection={showIcon ? <Picture w={20} h={20} src='/emoji/key' aria-hidden={true} alt='' /> : null}
            {...props}
        >
            {getChildren()}
        </Button>
    );
};
