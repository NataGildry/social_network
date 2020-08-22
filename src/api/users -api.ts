import {instance, ResponsesType} from './api';
import {UserType} from '../types/types';
import {profileAPI} from './profile-api';


type GetUsersResponseType = {
    // check the information about response in the documentation
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};
// type FollowUnfollowResponseType = {
//     // check the information about response in the documentation
//     data: {},
//     resultCode: ResultCodeEnum,
//     messages: Array<string>
// };
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponsesType>(`follow/${userId}`)
            .then(response => response.data) as Promise <ResponsesType>
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data) as Promise <ResponsesType>
    },
    getProfile(userId:  number) {
        // console.log('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId)
    },
};
