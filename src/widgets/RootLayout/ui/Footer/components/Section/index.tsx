import type { PropsWithChildren } from 'react';

import s from './Section.module.css';

interface SectionProps {
    title: string;
}

export const Section = ({ title, children }: PropsWithChildren<SectionProps>) => {
    return (
        <section className={s.section}>
            <h2>{title}</h2>
            {children}
        </section>
    );
};
