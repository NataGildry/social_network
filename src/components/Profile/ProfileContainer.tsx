import React, {Component} from 'react';
import Profile from './Profile';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveProfile,
    updateUserStatus
} from '../../redux/profileReducer';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {AppStateType} from '../../redux/redux-store';
import {ProfileType} from "../../types/types";


//type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string | null
    authorizedUserId: number | null
    isAuth: boolean
};
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void,
    getUserStatus: (userId:  number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>
};
type PathParamsType = {
    userId: string,
};
type OwnPropsType = RouteComponentProps<PathParamsType>

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class ProfileContainer extends Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            //  if (!userId) {
            //      this.props.history.push("/login");
            // }
        }
        if (!userId) {
            console.log("ID should exists in URI params or in state");
        } else {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     })
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType,) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile
                    isOwner={!!this.props.match.params.userId}
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateUserStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});
export default compose<React.ComponentType>
(connect
    //<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
    (mapStateToProps,
    {
        getUserProfile,
        getUserStatus,
        updateUserStatus,
        savePhoto,
        saveProfile
    }),
    withRouter,
    withAuthRedirect)
(ProfileContainer);
