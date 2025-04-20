export const API = {
    URL: import.meta.env.VITE_BASE_URL,
    surveys: {
        mainPage: '/surveys/main-page',
    },
    blog: {
        posts: '/posts',
        postById: (id: string) => `/posts/${id}`,
    },
};
