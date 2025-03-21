import { useState } from 'react';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';

import { InnerContainer } from '@/shared/ui';

import { Desktop } from './desktop';
import { Mobile } from './mobile';

import s from './ReportNavigationTemplate.module.css';

interface ReportNavigationTemplateProps {
    content: string[];
    page: number;
    title?: string;
    onPageChange(n: number): void;
    color?: string;
}

export const ReportNavigationTemplate = ({
    content,
    page,
    onPageChange,
    title,
    color = 'violet',
}: ReportNavigationTemplateProps) => {
    const [activeMenu, setActiveMenu] = useState(content[page] ?? title ?? 'Введение');
    const [_, scrollTo] = useWindowScroll();

    const [opened, { close, toggle }] = useDisclosure();

    const onPageChangeHandler = ({ idx, title }: { idx: number; title: string }) => {
        onPageChange(idx + 1);
        setActiveMenu(title);
        scrollTo({ y: 0 });
    };

    const props = {
        color,
        title,
        activeMenu,
        opened,
        content,
        setActiveMenu,
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
