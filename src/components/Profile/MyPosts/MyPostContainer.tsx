import {actions} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';
import {PostType} from '../../../types/types';

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

type MapStateToPropsType = {
    posts: Array<PostType>
    newPostText: string
};
type MapDispatchToPropsType = {
    addPostAC: (newPostText: string) => void
};
type OwnPropsType = {};
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};
// let mapDispatchToProps = (dispatch: MapDispatchToPropsType) => {
//     return {
//         addPost: (newPostText: string) => {
//             dispatch(actions.addPostActionCreator(newPostText));
//         }
//     }
// };

const MyPostsContainer = connect<MapStateToPropsType,
    MapDispatchToPropsType,
    OwnPropsType,
    AppStateType>(mapStateToProps, {addPostAC: actions.addPostActionCreator})(MyPosts);

export default MyPostsContainer;
