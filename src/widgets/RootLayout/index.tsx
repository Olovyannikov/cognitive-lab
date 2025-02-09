import type { PropsWithChildren } from 'react';

import s from './RootLayout.module.css';
import { Header } from './ui';

export const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className={s.app}>
            <Header className={s.header} />
            <main className={s.main} id='page-content'>
                {children}
            </main>
            {/*<Footer className={s.footer} />*/}
        </div>
    );
};
