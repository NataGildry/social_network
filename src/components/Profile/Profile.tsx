import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostContainer';
import {ProfileType} from '../../types/types';

type PropsType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string | null
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    //addPost: (newPostText: string) => Promise<any>
};

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
