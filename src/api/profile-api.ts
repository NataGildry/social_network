import {PhotosType, ProfileType} from '../types/types';
import {instance, ResponsesType} from './api';

type SavePhotoResponseType = {
    // check the information about response in the documentation
    photos: PhotosType
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponsesType>(`profile/status/`, {status: status})
            .then(response => response.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponsesType<SavePhotoResponseType>>(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile/`, profile)
            .then(response => response.data) as Promise<ResponsesType>
    }
};
