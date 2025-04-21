export const API = {
    URL: import.meta.env.VITE_BASE_URL,
    surveys: {
        mainPage: '/surveys/main-page',
        comments: '/surveys/comments',
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
};
