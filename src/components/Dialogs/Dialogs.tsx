import React from 'react';
import d from './Dialogs.module.css';
import DialogItem from './Dialog/DialogItem';
import Message from './Message/Message';
import {dialogDataType, messageDataType} from "../../redux/dialogReducer";
import {AddMessageReduxForm} from "./MessageForm/MessageForm";

type PropsType = {
    sendMessage: any,
    dialogData: Array<dialogDataType>,
    messageData: Array<messageDataType>
}

//type PropsType = OwnPropsType &  MapStateToPropsType & MapDispatchToPropsType;

const Dialogs: React.FC<PropsType> = (props) => {
    //Logic for sending messages to general state(changing general state with each character)
    // let newMessageBody = props.newMessageBody;
    //
    // let sendMessage = () => {
    //     props.sendMessage();
    // };
    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body);
    // };
    //
    // const dialogsElements = props.dialogData.map(dialog =>
    //     <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    // const messagesElements = props.messageData.map(mess =>
    //     <Message message={mess.message} key={mess.id} id={mess.id}/>);

    // const addNewMessage = (formData: NewMessageFormType) => {
    //     props.sendMessage(formData.newMessageBody);
    // };
    // if (!props.isAuth) {
    //     return <Redirect to={'/login'}/>
    // }
    let dialogsElements = props.dialogData.map(dialog =>
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messagesElements = props.messageData.map(mess =>
        <Message message={mess.message} key={mess.id} id={mess.id}/>);
    const addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageBody);
    };
    return (
        <div>
            <div className={d.dialogs}>
                <div className={d.dialogs_items}>
                    {dialogsElements}
                </div>
                <div className={d.messages}>
                    {messagesElements}
                    <div>
                        New message
                        <AddMessageReduxForm
                            onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
