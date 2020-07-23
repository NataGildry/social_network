import {addPostActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// const MyPostsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState();
//                 let addPost = () => {
//             store.dispatch(addPostActionCreator());
//         };
//             let onPostChange = (newText) => {
//             let action = updateNewPostTextActionCreator(newText);
//             store.dispatch(action);
//         };
//             return (
//                 <MyPosts
//                     updateNewPostText={onPostChange}
//                     addPost={addPost}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText}/>)
//         }}
//         </StoreContext.Consumer>
//     );
// };

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
