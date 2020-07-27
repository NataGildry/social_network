import React, {PureComponent} from 'react';
import mp from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostReduxForm from './PostForm/PostForm';


class MyPostsClassComponent extends PureComponent {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps != this.props || nextState != this.state;
    // }

    render() {

        let postsElements = this.props.posts.map(post =>
            <Post message={post.message} id={post.id} key={post.id} likeCouunt={post.likeCount}/>);
        const addNewPost = (values) => {
            this.props.addPost(values.newPostText);
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
    }
}

export default MyPostsClassComponent;
