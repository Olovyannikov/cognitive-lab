export const API = {
    URL: 'https://api.dev.cognitivelab.ru',
    surveys: {
        mainPage: '/surveys/main-page',
        comments: '/surveys/comments',
        personalityType: (type: string) => `/surveys/personality-types/${type}`,
        personalityTypes: '/surveys/personality-types',
        structure: '/surveys/structure',
        info: '/surveys/info',
        freeReport: '/surveys/free-report',
        freeReportById: (id: string) => `/surveys/free-report/${id}`,
        fullReport: (id: string) => `/surveys/full-reports/${id}`,
        start: '/surveys/start',
        email: (id: string) => `/surveys/free-report/${id}/email`,
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
        regularPrice: '/payments/regular-price',
        promoPrice: (code: string) => `/payments/promo-code-price?promo_code=${code}`,
    },
    support: {
        issues: '/support/issues',
    },
};
