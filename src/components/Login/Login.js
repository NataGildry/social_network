import React from 'react';
import LoginReduxForm from './LoginForm/LoginForm';
import {connect} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';


const Login = ({isAuth,login, captchaUrl }) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);
