export const API = {
    URL: import.meta.env.VITE_BASE_URL,
    PERSONALITY_TYPES: '/surveys/personality-types',
    PERSONALITY_TYPE: (type: string | unknown) => `/surveys/personality-types/${type}`,
    GET_REGULAR_PRICE: '/payments/regular-price',
    GET_STRUCTURE: '/surveys/structure',
    GET_PROMO_PRICE: (promocode: string) => `/payments/promo-code-price?promo_code=${promocode}`,
    SURVEYS_INFO: '/surveys/info',
    FULL_REPORT: (id: string) => `/surveys/full-reports/${id}`,
    FAQ_LIST: '/posts',
    BLOG_POSTS: '/posts',
    BLOG_POST_BY_ID: (id: string) => `/posts/${id}`,
    SEND_REPORT: '/support/issues',
    GET_FREE_REPORT: '/surveys/free-report',
    GET_FREE_REPORT_BY_ID: (id: string) => `/surveys/free-report/${id}`,
    // New format
    surveys: {
        email: (reportId: string) => `/surveys/free-report/${reportId}/email`,
        comments: '/surveys/comments',
        mainPage: '/surveys/main-page',
        start: '/surveys/start',
    },
    news: {
        subscribe: '/users/subscribe',
    },
    payments: {
        purchase: '/payments/purchase-report',
    },
};
