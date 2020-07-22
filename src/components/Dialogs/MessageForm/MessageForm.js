import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';

const maxLength50 = maxLengthCreator(50);

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
                    <Field name={"newMessageBody"}
                           component={Textarea}
                              placeholder={"Enter your Message"}
                           validate={[required, maxLength50]}
                    />
            <div>
                <button>New message</button>
            </div>
        </form>
    );
};
const AddMessageReduxForm = reduxForm ({form: 'message'}) (MessageForm);

export default AddMessageReduxForm;
