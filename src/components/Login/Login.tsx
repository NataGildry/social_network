import React from 'react';
import LoginReduxForm from './LoginForm/LoginForm';
import {connect} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';

type MapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
};
type MapDispatchToPropsType = {
   login : (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

//information that form collected

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
};


const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({isAuth, login, captchaUrl }) => {
    const onSubmit = (formData: LoginFormValuesType) => {
       login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}
                            captchaUrl={captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state:AppStateType):MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);
