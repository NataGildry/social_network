import React, {Component} from 'react';
import Profile from './Profile';
import {getUserProfile} from '../../redux/profileReducer';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

class ProfileContainer extends Component  {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {userId=2;}
        this.props.getUserProfile(userId);
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     })
    }
    render () {
        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
});
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect (mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);
