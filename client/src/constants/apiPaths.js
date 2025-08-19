export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
    SH: {
        GET_SH: "/api/sh",
        SH: "/api/sh/sh",
        LIKE: "/api/sh/like",
        COMMENTS: "/api/sh/comments"
    },
    USER: {
        GET_SOCIAL_DATA: (userId) => `/api/user/${userId}/social`,
        GET_USER: (id) => `/api/user/${id}`,
        GET_ALL_USERS: "/api/user/",
        CREATE_USER: "/api/user/create",
        UPDATE_USER: (id) => `/api/user/update/${id}`,
        FOLLOW_USER: "/api/user/follow",
        UNFOLLOW_USER: "/api/user/unfollow",
        ONBOARDING: "/api/user/complete"
    },
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register"
    }
};
