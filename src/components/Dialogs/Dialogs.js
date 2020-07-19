import React from 'react';
import d from './Dialogs.module.css';
import DialogItem from './Dialog/DialogItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';
import AddMessageReduxForm from './MessageForm/MessageForm';

const Dialogs = (props) => {
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

    let dialogsElements = props.dialogData.map(dialog =>
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messagesElements = props.messageData.map(mess =>
        <Message message={mess.message} key={mess.id} id={mess.id}/>);

    const addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
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
