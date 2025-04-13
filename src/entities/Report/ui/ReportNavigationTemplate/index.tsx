import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import { usePageContext } from 'vike-react/usePageContext';

import { InnerContainer } from '@/shared/ui';

import { Desktop } from './desktop';
import { Mobile } from './mobile';

import s from './ReportNavigationTemplate.module.css';

interface ReportNavigationTemplateProps {
    content: string[];
    title?: string;
    onPageChange(n: number): void;
    color?: string;
    activeMenu?: string;
}

export const ReportNavigationTemplate = ({
    content,
    onPageChange,
    title,
    color = 'violet',
    activeMenu = 'Введение',
}: ReportNavigationTemplateProps) => {
    const [_, scrollTo] = useWindowScroll();
    const {
        urlParsed: { pathname },
    } = usePageContext();

    const [opened, { close, toggle }] = useDisclosure();

    const isFreeReport = pathname.includes('free');

    const onPageChangeHandler = ({ idx }: { idx: number; title: string }) => {
        onPageChange(idx + 1);
        setTimeout(() => !isFreeReport && scrollTo({ y: 0 }), 0);
    };

    const props = {
        color,
        title,
        activeMenu,
        opened,
        content,
        onPageChange: onPageChangeHandler,
    };

    return (
        <div className={s.wrapper}>
            <InnerContainer className={s.block}>
                <Desktop {...props} toggle={toggle} />
                <Mobile {...props} close={close} />
            </InnerContainer>
        </div>
    );
};
