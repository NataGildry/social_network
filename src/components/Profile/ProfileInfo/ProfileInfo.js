import React from 'react';
import pi from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import Status from './Status';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={pi.description_block}>
                <img src={props.profile.photos.large} alt=""/>
                <Status status={props.status} updateUserStatus={props.updateUserStatus}/>
                <div>
                    About me
                    <p>{props.profile.aboutMe}</p>
                    My contacts:
                    <p>{props.profile.contacts.facebook}</p>
                    <p>{props.profile.contacts.instagram}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
