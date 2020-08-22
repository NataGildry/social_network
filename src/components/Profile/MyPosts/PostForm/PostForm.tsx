import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../../utils/validators/validators';
import {createField, Textarea} from '../../../common/FormsControls/FormsControls';

type PropsType = {
};
//choose only keys that are a string
export type PostFormValuesKeysType = Extract<keyof AddPostFormValuesType, string>;
export type AddPostFormValuesType = {
    newPostText:string
};
const maxLength10 = maxLengthCreator(10);

const PostForm: React.FC<InjectedFormProps<AddPostFormValuesType,
    PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            {createField<PostFormValuesKeysType>("Enter your post", "newPostText",
                [required, maxLength10], Textarea)}
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};
const AddPostReduxForm = reduxForm<AddPostFormValuesType, PropsType> ({form: 'post'}) (PostForm);

export default AddPostReduxForm;
