import React from 'react';


const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div> }
            <div>
                <b>About me</b>
                <div>
                    <b>Full name</b> : {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                <div>
                    <b>My professiional skills</b> : {profile.lookingForAJobDescription}
                </div>}
                <p>{profile.aboutMe}</p>
            </div>
        </div>
    );
};

export default ProfileData;
