import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators/validators';
import {createField, Textarea} from '../../common/FormsControls/FormsControls';

const maxLength50 = maxLengthCreator(50);
 type NewMessageFormType = {
    newMessageBody: string
};
type MessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>;
type PropsType = {
   //newMessageBody: string
};

const MessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            {createField<MessageFormValuesKeysType>("Enter your Message", "newMessageBody",
                [required, maxLength50], Textarea)}
            <div>
                <button>New message</button>
            </div>
        </form>
    );
};
// @ts-ignore
export const AddMessageReduxForm = reduxForm<MessageFormValuesKeysType, PropsType> ({form: 'message'}) (MessageForm);
