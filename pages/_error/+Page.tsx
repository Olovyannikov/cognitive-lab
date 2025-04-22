import { usePageContext } from 'vike-react/usePageContext';

import { ErrorPage } from '@/pages/ErrorPage';

export default function Page() {
    const { is404 } = usePageContext();
    if (is404) return <ErrorPage />;

    return <ErrorPage image='/errors/500' title='Что-то пошло не так...' />;
}
