import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../redux/authReducer';
import {AppStateType} from "../../redux/redux-store";
import {Header} from "./Header";


type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
};
type MapDispatchToPropsType = {
    logout: () => void
};
type OwnPropsType = {};
type PropsType =  MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class HeaderContainer extends Component<PropsType> {

        //code without THUNK --- getAuthUserData is moved to App component
        // authAPI.getMyProfile()
        //     .then(data => {
        //         if (data.resultCode === 0) {
        //             let {id, email, login} = data.data;
        //             this.props.setAuthUserData(id, email, login);
        //         }
        //     })
        //code without API
        // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //     withCredentials: true
        // })
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             let {id, email, login} = response.data.data;
        //             this.props.setAuthUserData(id, email, login);
        //         }
        //     }) ()
    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);
