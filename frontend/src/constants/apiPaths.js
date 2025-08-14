export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
    SH:{
        GET_SH:"/api/sh",
        SH:"/api/sh/sh",
        LIKE:"/api/sh/like",
        COMMENTS:"/api/sh/comments"
    },
    USER:{
        GET_SOCIAL_DATA:"/api/user/:userId/social",
        GET_USER:"/api/user/:id",
        GET_ALL_USERS:"/api/user/",
        CREATE_USER:"/api/user/create",
        UPDATE_USER:"/api/user/update/:id",
        FOLLOW_USER:"/api/user/follow",
        UNFOLLOW_USER:"/api/user/unfollow",
        ONBOARDING:"/api/user/complete-onboarding"
    },
    AUTH:{
        LOGIN:"/api/auth/login",
        REGISTER:"/api/auth/register",
        UPDATE:"/api/auth/update",
        PROFILE:"/api/auth/upload-profile",
        UPLOAD_IMAGE: "/api/auth/upload-image",
    }
}
