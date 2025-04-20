import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import type { Scope, SerializedState } from 'effector';
import type { PageContextClient } from 'vike/types';
import { usePageContext } from 'vike-react/usePageContext';

import { getScope } from './getScope';

export const ScopeContext = createContext<Scope | undefined>(undefined);
export const ScopeUpdateContext = createContext<(values: SerializedState) => void>(() => {});

export const ScopeProvider = ({ children }: PropsWithChildren) => {
    const pageContext = usePageContext() as PageContextClient;
    const [scope, setScope] = useState<Scope | undefined>('scope' in pageContext ? pageContext.scope : getScope());

    const update = useCallback((values: SerializedState) => {
        setScope(getScope(values));
    }, []);

    useEffect(() => {
        if (!pageContext.isHydration) {
            setScope(getScope());
        }
    }, [pageContext]);

    return (
        <ScopeContext.Provider value={scope}>
            <ScopeUpdateContext.Provider value={update}>{children}</ScopeUpdateContext.Provider>
        </ScopeContext.Provider>
    );
};

export const useScope = () => useContext(ScopeContext);
export const useScopeUpdate = () => useContext(ScopeUpdateContext);
