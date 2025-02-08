import type { EventCallable, Scope } from 'effector';
import type { PageContextClient, PageContextServer } from 'vike/types';

// https://vike.dev/pageContext#typescript
declare global {
    namespace Vike {
        interface PageContext {
            config: {
                /** Page init event - server side */
                pageInitiated?: EventCallable<PageContextServer>;
                /** Page start event - client side */
                pageStarted?: EventCallable<PageContextClient>;
            };
            // https://effector.dev/en/api/effector/scope/
            scope?: Scope;
            scopeValues: Record<string, unknown>;
        }
    }
}
