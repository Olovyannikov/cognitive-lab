const __vite__mapDeps = (
    i,
    m = __vite__mapDeps,
    d = m.f ||
        (m.f = [
            './pages-DMFhc8da.js',
            './_plugin-vue_export-helper-DfavQbjy.js',
            './payload-BKj06nBe.js',
            './runtime-core.esm-bundler-BYdEh_Lp.js',
            './ModuleList-DVacKD_e.js',
            './vue-router-DP5m7_x8.js',
            './QuerySelector-CM_pgBDK.js',
            './options-C60pcttb.js',
            './search-Bta8DXiP.js',
            './_...all_-CzVXVg-0.js',
            './metric-BkP--q7q.js',
            './hot-C38Zn4iD.js',
            './module-Brdd4maj.js',
            './module-2YhSO2gi.css',
            './plugins-o0TP5Bf_.js',
        ])
) => i.map((i) => d[i]);
import {
    Suspense,
    createBlock,
    createElementBlock,
    createTextVNode,
    createVNode,
    defineComponent,
    h,
    onMounted,
    openBlock,
    resolveComponent,
    withAsyncContext,
    withCtx,
} from './runtime-core.esm-bundler-BYdEh_Lp.js';
import { createApp, createRouter, createWebHashHistory } from './vue-router-DP5m7_x8.js';
import { __vitePreload, createPinia, isStaticMode, usePayloadStore } from './payload-BKj06nBe.js';
(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) return;
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;
            for (const node of mutation.addedNodes)
                if (node.tagName === 'LINK' && node.rel === 'modulepreload') processPreload(node);
        }
    }).observe(document, {
        childList: true,
        subtree: true,
    });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity) fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials') fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous') fetchOpts.credentials = 'omit';
        else fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep) return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
})();
const routes = [
    {
        path: '/',
        name: '/',
        component: () =>
            __vitePreload(
                () => import('./pages-DMFhc8da.js'),
                __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]),
                import.meta.url
            ),
        children: [
            {
                path: ':all(.*)',
                name: '//[...all]',
                component: () =>
                    __vitePreload(() => import('./_...all_-CzVXVg-0.js'), __vite__mapDeps([9, 1, 3]), import.meta.url),
            },
            {
                path: 'metric',
                name: '//metric',
                component: () =>
                    __vitePreload(
                        () => import('./metric-BkP--q7q.js'),
                        __vite__mapDeps([10, 1, 2, 3, 8, 7, 6, 11]),
                        import.meta.url
                    ),
            },
            {
                path: 'module',
                name: '//module',
                component: () =>
                    __vitePreload(
                        () => import('./module-Brdd4maj.js'),
                        __vite__mapDeps([12, 1, 2, 3, 4, 5, 6, 7, 11, 13]),
                        import.meta.url
                    ),
            },
            {
                path: 'plugins',
                name: '//plugins',
                component: () =>
                    __vitePreload(
                        () => import('./plugins-o0TP5Bf_.js'),
                        __vite__mapDeps([14, 1, 2, 3, 6]),
                        import.meta.url
                    ),
            },
        ],
    },
];
const _hoisted_1 = {
    grid: '~ rows-[min-content_1fr]',
    size: 'h-screen w-screen',
};
var App_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
    __name: 'App',
    async setup(__props) {
        let __temp, __restore;
        onMounted(() => {
            if (isStaticMode) document.title = 'Vite Inspect (Production)';
        });
        const payload = usePayloadStore();
        ([__temp, __restore] = withAsyncContext(() => payload.init())), await __temp, __restore();
        return (_ctx, _cache) => {
            const _component_RouterView = resolveComponent('RouterView');
            return (
                openBlock(),
                createElementBlock('main', _hoisted_1, [
                    (openBlock(),
                    createBlock(Suspense, null, {
                        fallback: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(' Loading... ')])),
                        default: withCtx(() => [createVNode(_component_RouterView)]),
                        _: 1,
                    })),
                ])
            );
        };
    },
});
var App_default = App_vue_vue_type_script_setup_true_lang_default;
const app = createApp(() =>
    h(
        Suspense,
        {},
        {
            default: () => h(App_default),
            fallback: 'Loading...',
        }
    )
);
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
