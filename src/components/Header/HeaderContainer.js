import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {getAuthUserData} from '../../redux/authReducer';

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.getAuthUserData();
        //code without THUNK
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
        //     })
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
