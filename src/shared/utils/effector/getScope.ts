// implementation is taken from the official effector/next library
// to support proper scope updates and after transition effects

import { createStore, fork, Json, launch, Node, Scope, StateRef } from 'effector';

// types for convenience
type StoreSerializationConfig = Exclude<Parameters<typeof createStore>[1], undefined>['serialize'];

type ScopeInternal = Scope & {
    reg: Record<string, StateRef & { meta?: Record<string, string> }>;
    additionalLinks: Record<string, Node[]>;
};
type Values = Record<string, unknown>;

const isClient = typeof document !== 'undefined';

function getServerScope(values?: Values) {
    return fork({ values });
}

/**
 * The following code is some VERY VERY VERY BAD HACKS.
 *
 * This only work for a compatibility layer with Next.js and only because of the peculiarities of Next.js behavior.
 *
 * This temporary solution on hacks allows us to solve the pain of library users when working with Next.js, as well as gather much more information to develop a better API.
 */
const currentScope: Scope = fork();

/*
 *
 * Handler to get current client scope.
 *
 * Required for proper integrations with dev-tools.
 *
 * @returns current client scope in browser and null in server environment
 */
export function getClientScope() {
    if (isClient) {
        return currentScope;
    }

    return null;
}

let prevValues: Values;
/**
 * @private
 *
 * Should not be exported to the public API
 */

function HACK_injectValues(scope: Scope, values: Values) {
    // @ts-expect-error this is a really hacky way to "hydrate" scope
    Object.assign(scope.values.sidMap, values);
}

function HACK_runScopeWatchers(scope: ScopeInternal, linksToRun: string[]) {
    if (linksToRun.length) {
        linksToRun.forEach((nodeId) => {
            const links = scope.additionalLinks[nodeId];

            if (links) {
                links.forEach((link) => {
                    if (link.meta.watchOp === 'store') {
                        launch({
                            target: link,
                            params: null,
                            scope,
                        });
                    }
                });
            }
        });
    }
}

function HACK_updateScopeRefs(tscope: Scope, values: Values) {
    const scope = tscope as ScopeInternal;

    const linksToRun: string[] = [];

    for (const id in scope.reg) {
        if (Object.hasOwnProperty.call(scope.reg, id)) {
            const ref = scope.reg[id];

            /**
             * Schedule external watchers (useUnit, etc.) re-run
             */
            const nodeId = ref?.meta?.id;

            if (nodeId && scope.additionalLinks[nodeId]) {
                linksToRun.push(nodeId);
            }

            if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete scope.reg[id];
            } else {
                const sid = ref?.meta?.sid;
                if (sid && sid in values) {
                    const serialize = ref?.meta?.serialize as StoreSerializationConfig;
                    const read = serialize && serialize !== 'ignore' ? serialize?.read : null;
                    ref.current = read ? read(values[sid] as Json) : values[sid];
                }
            }
        }
    }
    queueMicrotask(() => {
        HACK_runScopeWatchers(scope, linksToRun);
    });
}

function INTERNAL_getClientScope(values?: Values) {
    if (!values || values === prevValues) return currentScope;
    prevValues = values;

    HACK_injectValues(currentScope, values);
    HACK_updateScopeRefs(currentScope, values);

    return currentScope;
}

export const getScope = isClient ? INTERNAL_getClientScope : getServerScope;
