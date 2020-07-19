import React from 'react';
import {Field, reduxForm} from 'redux-form';

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
                    <Field name={"newMessageBody"}
                           component={"textarea"}
                              placeholder={"Enter your Message"}
                    />
            <div>
                <button>New message</button>
            </div>
        </form>
    );
};
const AddMessageReduxForm = reduxForm ({form: 'message'}) (MessageForm);

export default AddMessageReduxForm;
