import { usePageContext } from 'vike-react/usePageContext';

import { BackButton, InnerContainer } from '@/shared/ui';

export default function Page() {
    const { is404 } = usePageContext();
    if (is404) {
        return (
            <InnerContainer>
                <BackButton />
                <h1>404 Page Not Found</h1>
                <p>This page could not be found.</p>
            </InnerContainer>
        );
    }
    return (
        <InnerContainer>
            <BackButton />
            <h1>500 Internal Server Error</h1>
            <p>Something went wrong.</p>
        </InnerContainer>
    );
}
