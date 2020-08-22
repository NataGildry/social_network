import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import s from './ProfileInfo.module.css';
import styles from '../../common/FormsControls/FormsControl.module.css';
import {ProfileType} from "../../../types/types";


type ProfileDataFormOwnProps = {
    profile: ProfileType
};
//choose only keys that are a string
type ProfileDataFormValuesKeysType = Extract<keyof ProfileType, string>;


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType,
    ProfileDataFormOwnProps> & ProfileDataFormOwnProps> = ({
                                                               handleSubmit,
                                                               profile,
                                                               error
                                                           }) => {
    console.log(error);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button onClick={() => {
                }}>save
                </button>
            </div>
            <div>
                {error && <div className={styles.formSummaryError}>{error}</div>}
            </div>
            <div>
                <div>
                    <b>Full name</b> : {createField<ProfileDataFormValuesKeysType>("Full name",
                    "fullName", [],
                    Input, {}, "")}
                </div>
                <div>
                    <b>Looking for a job</b> : {createField<ProfileDataFormValuesKeysType>("",
                    "lookingForAJob", [],
                    Input, {type: "checkbox"}, "")}
                </div>
                <div>
                    <b>My professional
                        skills</b> : {createField<ProfileDataFormValuesKeysType>("My professional skills",
                    "lookingForAJobDescription", [],
                    Textarea, {}, "")}
                </div>
                <b>About me</b>:
                {createField<ProfileDataFormValuesKeysType>("About me",
                    "aboutMe", [],
                    Textarea, {}, "")}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts)
                .map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: {createField(key,
                            "contacts." + key, [],
                            Input, {}, "")}</b>
                    </div>
                })}
            </div>
        </form>
    );
};

const ReduxProfileDataForm = reduxForm<ProfileType, ProfileDataFormOwnProps>
({form: 'editProfile'})(ProfileDataForm);
export default ReduxProfileDataForm;
