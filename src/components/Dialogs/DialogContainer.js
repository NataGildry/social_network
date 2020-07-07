import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let sendMessage = () => {
        props.store.dispatch(sendMessageActionCreator());
    };
    let onNewMessageChange = (body) => {
        let action = updateNewMessageBodyActionCreator(body);
        props.store.dispatch(action);
    };
    return (
        <Dialogs
            updateNewMessageBody = {onNewMessageChange}
            sendMessage = {sendMessage}
            dialogData = {state.dialogData}
            messageData = {state.messageData}
            newMessageBody = {state.newMessageBody}
        />
    );
};

export default DialogsContainer;
