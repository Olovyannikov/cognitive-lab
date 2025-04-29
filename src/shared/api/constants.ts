export const API = {
    URL: import.meta.env.VITE_BASE_URL,
    surveys: {
        mainPage: '/surveys/main-page',
        comments: '/surveys/comments',
        personalityType: (type: string) => `/surveys/personality-types/${type}`,
        personalityTypes: '/surveys/personality-types',
        structure: '/surveys/structure',
        regularPrice: '/surveys/regular-price',
        promoPrice: (code: string) => `/surveys/promo-code-price?promo_code=${code}`,
        info: '/surveys/info',
        freeReport: '/surveys/free-report',
        freeReportById: (id: string) => `/surveys/free-report/${id}`,
        fullReport: (id: string) => `/surveys/full-reports/${id}`,
        start: '/surveys/start',
    },
    blog: {
        posts: '/posts',
        postById: (id: string) => `/posts/${id}`,
    },
    faq: {
        list: '/posts',
    },
    news: {
        subscribe: '/users/subscribe',
    },
    payments: {
        purchase: '/payments/purchase-report',
    },
    support: {
        issues: '/support/issues',
    },
};
