import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../../../utils/validators/validators';
import {Textarea} from '../../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <Field name={"newPostText"}
                   component={Textarea}
                   placeholder={"Enter your post"}
                   validate={[required, maxLength10]}
            />
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};
const AddPostReduxForm = reduxForm ({form: 'post'}) (PostForm);

export default AddPostReduxForm;
