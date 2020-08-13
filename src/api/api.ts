import axios from 'axios';
import {PhotosType, ProfileType, UserType} from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "1361bc53-6a1c-4229-9803-b21cf0bd1289"
    }
});

type GetUsersResponseType = {
    // check the information about response in the documentation
    items : Array<UserType>,
    totalCount: number,
    error: string | null
};
type FollowUnfollowResponseType = {
    // check the information about response in the documentation
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId:number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    unfollow(userId:number) {
        return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
    },
    getProfile(userId:number) {
       // console.log('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId)
            .then(response => response.data)
    },
};

type UpdateStatusResponseType = {
    // check the information about response in the documentation
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};
type SavePhotoResponseType = {
    // check the information about response in the documentation
    data: { photos: PhotosType }
    resultCode: ResultCodeEnum,
    messages: Array<string>
};
type SaveProfileResponseType = {
    // check the information about response in the documentation
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};
export const profileAPI = {
    getProfile(userId:number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId:number) {
        return instance.get<any>(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status/`, {status: status})
    },
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<SavePhotoResponseType>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<SaveProfileResponseType>(`profile/`, profile)
    }
};

export enum ResultCodeEnum {
    Success=0,
    Error=1,
}
export enum ResultCodeForCaptureEnum {
    CaptureIsRequired=10
}

type GetMyProfileResponseType = {
    // check the information about response in the documentation
    data: {id:number,
           email:string,
           login:string},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};
type LoginResponseType = {
    // check the information about response in the documentation
    data: {userId:number},
    resultCode: ResultCodeEnum | ResultCodeForCaptureEnum,
    messages: Array<string>
};
type LogoutResponseType = {
    // check the information about response in the documentation
    data: {},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};


export const authAPI = {
    getMyProfile() {
        return instance.get<GetMyProfileResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email:string, password:string, rememberMe = false,
          captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`,
            {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(response => response.data);
    },
};

type GetCaptchaUrlResponseType = {
    url:string
};
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
    }
};

