import React from 'react';
import {reduxForm} from 'redux-form';
import {createField, Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../../utils/validators/validators';
import styles from '../../common/FormsControls/FormsControl.module.css';


const LoginForm = ({handleSubmit, captchaUrl, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src="captchaUrl"/>}
            {captchaUrl && createField('Symbols from IMG', "captcha", [required], Input, {})}
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default LoginReduxForm;
