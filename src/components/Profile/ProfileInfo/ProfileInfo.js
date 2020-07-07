import React from "react";
import pi from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={pi.image}>
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/16/ff/b2/f3/ic-5-24.jpg" alt=""/>
            </div>
            <div className={pi.description_block}>
                ava+description
            </div>
        </div>
    );
};

export default ProfileInfo;
