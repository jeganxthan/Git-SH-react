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
        GET_ALL_USERS: "/api/user/allusers",
        CREATE_USER: "/api/user/create",
        UPDATE_USER: (id) => `/api/user/update/${id}`,
        FOLLOW_USER: "/api/user/follow",
        UNFOLLOW_USER: "/api/user/unfollow",
        ONBOARDING: "/api/user/complete",
        GET_CURRENT_USER_STATS:(id) => `/api/user/alluser/${id}`,
        SOCIAL_DATA:"/api/user/social"
    },
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        PROFILE: "/api/auth/profile",
        VERIFY_OTP:"api/auth/verify-otp",
        RESEND_OTP:"api/auth/resend"
    },
    UPLOAD:{
        IMAGE:"/api/upload/"
    }
};
