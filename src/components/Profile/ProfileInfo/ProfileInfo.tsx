import React, {ChangeEvent, useState} from 'react';
import pi from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import StatusWithHooks from './StatusWithHooks';
import userPhoto from '../../../assets/images/240administrator-male.png';
import Contact from './Contacts';
import ProfileData from './ProfileData';
import ReduxProfileDataForm from './ProfileDataForm';
import {ProfileType} from '../../../types/types';

type PropsType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string | null
    updateUserStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
};

const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        props.saveProfile(formData)
            //выйду из режима редактирования, только если все поля корректны (На промисах)
            .then(() => {
                setEditMode(false)
            })

        //если поставить setEditMode(false) без промиса, то будет выходить из режима редактированияб,но не будет отобрадаться ошибка
        //setEditMode(false);
    };

    return (
        <div>
            <div className={pi.description_block}>
                <img src={props.profile.photos.large || userPhoto} alt=""/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <div>
                    <b>Status:</b>
                    <StatusWithHooks status={props.status}
                                     updateUserStatus={props.updateUserStatus}/>
                </div>
                {editMode ? <ReduxProfileDataForm onSubmit={onSubmit}
                                                  initialValues={props.profile}
                                                  profile={props.profile}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={props.profile} isOwner={props.isOwner}/>
                }
                <b>Contacts</b>: {
                Object
                    .keys(props.profile.contacts)
                    .map((key) => {
                return <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={props.profile?.contacts[key as any]}/>
            })}
            </div>
        </div>
    );
};

export default ProfileInfo;
