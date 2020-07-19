import React from 'react';
import mp from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostReduxForm from './PostForm/PostForm';


const MyPosts = (props) => {

    let postsElements = props.posts.map(post =>
        <Post message={post.message} id={post.id} key={post.id} likeCouunt={post.likeCount}/>);
    const addNewPost = (values) => {
        props.addPost(values.newPostText);
    };
    // let onAddPost = () => {
    //     props.addPost();
    // };
    // let newPostText = props.newPostText;
    // let onPostChange = (e) => {
    //     let newText = e.target.value;
    //     props.updateNewPostText(newText);
    // };
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
};

export default MyPosts;
