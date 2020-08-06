import React, {Component} from 'react';
import Profile from './Profile';
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from '../../redux/profileReducer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends Component {
    refreshProfile () {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            //  if (!userId) {
            //      this.props.history.push("/login");
            // }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }
    componentDidMount() {
       this.refreshProfile();
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
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
                    saveProfile={this.props.saveProfile}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});


export default compose(connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect)
(ProfileContainer);
