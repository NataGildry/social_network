const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ],
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST :
            let newText = state.newPostText;
            state.newPostText = '';
            state.posts.push({
                id: 5, message: newText
            });
            return state;
        case UPDATE_NEW_POST_TEXT :
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({
        type: UPDATE_NEW_POST_TEXT, newText: text
    }
);

export default profileReducer;
