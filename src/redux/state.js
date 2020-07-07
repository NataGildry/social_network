import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import sidebarReducer from "./sidebarReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, it is me', likeCount: 5},
                {id: 2, message: 'It is my first post here', likeCount: 60},
                {id: 3, message: 'It is my second post here', likeCount: 200}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogData: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Lena'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Anna'},
                {id: 5, name: 'Sasha'},
            ],
            messageData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'How is your day?'},
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
};


export default store;
window.store = store;
