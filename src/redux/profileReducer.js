const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, it is me', likeCount: 5},
        {id: 2, message: 'It is my first post here', likeCount: 60},
        {id: 3, message: 'It is my second post here', likeCount: 200}
    ],
    newPostText: '',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST :
            let newText = state.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {id: 5, message: newText}]
            };
        case UPDATE_NEW_POST_TEXT :
            return {
                ...state,
           newPostText: action.newText};
        case SET_USER_PROFILE :
            return {
                ...state,
                profile: action.profile};


        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({
        type: UPDATE_NEW_POST_TEXT, newText: text
    }
);
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export default profileReducer;
