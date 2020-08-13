import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../../common/FormsControls/FormsControls';
import {required} from '../../../utils/validators/validators';
import styles from '../../common/FormsControls/FormsControl.module.css';
import {LoginFormValuesType} from '../Login';

//personal component props
type LoginFormOwnProps = {
    captchaUrl: string | null
};
//choose only keys that are a string
type LoginFormValuesKeysType = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,
    LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                   handleSubmit,
                                                   captchaUrl,
                                                   error
                                               }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesKeysType>("Email", "email", [required], Input)}
            {createField<LoginFormValuesKeysType>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesKeysType>(undefined, "rememberMe", null, Input, {type: "checkbox"}, "remember me")}
            {captchaUrl && <img src="captchaUrl"/>}
            {captchaUrl && createField<LoginFormValuesKeysType>('Symbols from IMG', "captcha", [required], Input, {})}
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

export default LoginReduxForm;
