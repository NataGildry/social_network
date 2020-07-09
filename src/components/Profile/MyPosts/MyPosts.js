import React from "react";
import mp from './MyPosts.module.css';
import Post from "./Post/Post";


const MyPosts = (props) => {

    let postsElements = props.posts.map(post =>
        <Post message={post.message} id={post.id} key={post.id} likeCouunt={post.likeCount}/>);

    let onAddPost = () => {
        props.addPost();
    };
    let newPostText = props.newPostText;
    let onPostChange = (e) => {
        let newText = e.target.value;
        props.updateNewPostText(newText);
    };
    return (
        <div className={mp.post_block}>
            <h3>My posts</h3>
            <div>
                New post
                <div>
                    <textarea name="post"
                              value={newPostText}
                              onChange={onPostChange}
                              placeholder='Enter your post'/>
                    <div>
                        <button onClick={onAddPost}>Add post</button>
                    </div>
                </div>
            </div>
            {postsElements}
        </div>
    );
};

export default MyPosts;
