import type { PropsWithChildren } from 'react';
import { useGate } from 'effector-react';

import { PersonalitiesInitialGate } from '@/entities/Personalities';
import { UserModel } from '@/entities/User';

import s from './RootLayout.module.css';
import { Footer, Header } from './ui';

export const RootLayout = ({ children }: PropsWithChildren) => {
    useGate(PersonalitiesInitialGate);
    useGate(UserModel.UserGate);

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
