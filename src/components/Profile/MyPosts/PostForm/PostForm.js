import React from 'react';
import {Field, reduxForm} from 'redux-form';

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <Field name={"newPostText"}
                   component={"textarea"}
                   placeholder={"Enter your post"}
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};
const AddPostReduxForm = reduxForm ({form: 'post'}) (PostForm);

export default AddPostReduxForm;
