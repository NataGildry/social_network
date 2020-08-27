import React from 'react';
import LoginReduxForm from './LoginForm/LoginForm';
import {connect, useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';
import {AppStateType} from '../../redux/redux-store';


type PropsType = {};

//information that form collected

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
};

export const Login: React.FC<PropsType> = (props) => {

   const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
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
