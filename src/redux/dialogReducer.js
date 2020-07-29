//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'social-network/dialog/SEND_MESSAGE';

let initialState = {
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
    ]
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY :
        //    return {
        //         ...state,
        //         newMessageBody: action.body
        //     };
        case SEND_MESSAGE :
            let body = action.newMessageBody;
            return {
                ...state,
                messageData: [...state.messageData, {id: 6, message: body}]
            };
        default:
            return state;
    }
};
export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});
// export const updateNewMessageBodyActionCreator = (text) => (
//     {type: UPDATE_NEW_MESSAGE_BODY, body: text}
// );

export default dialogReducer;
