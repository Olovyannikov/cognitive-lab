import type { ComponentType } from 'react';

import { TypesNavigationMenu } from '../TypesNavigationMenu';

export interface NavigationItem {
    id: number;
    label: string;
    link: `/${string}`;
    Children?: ComponentType;
}

export const NAV_CONFIG: NavigationItem[] = [
    {
        id: 0,
        label: 'Типы личности',
        link: '/types',
        Children: TypesNavigationMenu,
    },
    {
        id: 1,
        label: 'Блог',
        link: '/blog',
    },
];
