import type { PropsWithChildren } from 'react';
import { useGate } from 'effector-react';

import { ReportModel } from '@/entities/Report';

import { Footer, Header } from './ui';

import s from './RootLayout.module.css';

export const RootLayout = ({ children }: PropsWithChildren) => {
    useGate(ReportModel.ReportGate);
    return (
        <div className={s.app}>
            <Header className={s.header} />
            <main className={s.main} id='page-content'>
                {children}
            </main>
            <Footer className={s.footer} />
        </div>
    );
};
