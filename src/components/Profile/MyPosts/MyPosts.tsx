import React from 'react';
import mp from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostReduxForm, {AddPostFormValuesType} from './PostForm/PostForm';
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>,
    addPostAC: (newPostText: string) => void
};

const MyPosts: React.FC<PropsType> = React.memo(props => {
    console.log("Render you");

    let postsElements =
        [...props.posts]
            .reverse()
            .map(post =>
                <Post message={post.message} id={post.id} key={post.id} likeCouunt={post.likeCount}/>);
    const addNewPost = (values: AddPostFormValuesType) => {
        props.addPostAC(values.newPostText);
    };
    return (
        <div className={mp.post_block}>
            <h3>My posts</h3>
            <div>
                New post
                <AddPostReduxForm onSubmit={addNewPost}/>
            </div>
            {postsElements}
        </div>
    );
});

export default MyPosts;
