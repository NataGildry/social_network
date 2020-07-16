import React from 'react';
import pi from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={pi.image}>
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/16/ff/b2/f3/ic-5-24.jpg" alt=""/>
            </div>
            <div className={pi.description_block}>
                <img src={props.profile.photos.large} alt=""/>
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
