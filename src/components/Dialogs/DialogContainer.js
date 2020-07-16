import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


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

let mapDispatchToProps =(dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            let action = updateNewMessageBodyActionCreator(body);
            dispatch(action);
        },
        sendMessage: () => {
           dispatch(sendMessageActionCreator());
        }
    }
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


export default DialogsContainer;
