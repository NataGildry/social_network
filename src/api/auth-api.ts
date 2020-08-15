import {instance, ResponsesType} from './api';

//creation of generic for Response type

type GetMyProfileResponseDataType = {
    // check the information about response in the documentation
    id: number,
    email: string,
    login: string
};
type LoginResponseDataType = {
    // check the information about response in the documentation
    userId: number
};
export const authAPI = {
    getMyProfile() {
        return instance.get<ResponsesType<GetMyProfileResponseDataType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false,
          captcha: null | string = null) {
        return instance.post<ResponsesType<LoginResponseDataType>>(`auth/login`,
            {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data) as Promise<ResponsesType>;
    },
};
