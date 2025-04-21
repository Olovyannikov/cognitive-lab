import type { PropsWithChildren } from 'react';

import { Footer } from './ui';

import s from './RootLayout.module.css';

export const RootLayout = ({ children }: PropsWithChildren) => (
    <div className={s.app}>
        {/*<Header className={s.header} />*/}
        <main className={s.main} id='page-content'>
            {children}
        </main>
        <Footer className={s.footer} />
    </div>
);
