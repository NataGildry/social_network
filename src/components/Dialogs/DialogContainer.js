import {actions} from '../../redux/dialogReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import React from 'react';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


// const DialogsContainer = () => {
//
//     return (
//         <StoreContext.Consumer>
//             {(store) => {
//                 let state = store.getState().dialogsPage;
//
//                 let sendMessage = () => {
//                     store.dispatch(sendMessageActionCreator());
//                 };
//                 let onNewMessageChange = (body) => {
//                     let action = updateNewMessageBodyActionCreator(body);
//                     store.dispatch(action);
//                 };
//                 return (
//                     <Dialogs
//                         updateNewMessageBody={onNewMessageChange}
//                         sendMessage={sendMessage}
//                         dialogData={state.dialogData}
//                         messageData={state.messageData}
//                         newMessageBody={state.newMessageBody}
//                     />)
//
//             }}
//         </StoreContext.Consumer>
//
//     );
// }; =========> How Container Components work in general

let mapStateToProps = (state) => {
    return {
        dialogData: state.dialogsPage.dialogData,
        messageData: state.dialogsPage.messageData,
        newMessageBody: state.dialogsPage.newMessageBody,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        //we used updateNewMessageBody for changing message text with each character
        // updateNewMessageBody: (body) => {
        //     let action = updateNewMessageBodyActionCreator(body);
        //     dispatch(action);
        // },
        sendMessage: (newMessageBody) => {
            dispatch(actions.sendMessageActionCreator(newMessageBody));
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
