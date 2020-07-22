import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "484c0e1a-a3b0-4587-8f25-36cccb87f669"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        console.log('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId)
            .then(response => response.data)
    },
};


export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus (userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus (status) {
        return instance.put(`profile/status/`, {status:status})
    },
};

export const authAPI = {
    getMyProfile() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login (email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout () {
        return instance.delete(`auth/login`);
    },
};

