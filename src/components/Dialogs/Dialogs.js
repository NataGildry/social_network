import React from "react";
import d from './Dialogs.module.css';
import DialogItem from "./Dialog/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.dialogData.map(dialog =>
        <DialogItem name={dialog.name}  key={dialog.id} id={dialog.id}/>);
    let messagesElements = props.messageData.map(mess =>
        <Message message={mess.message} key={mess.id} id={mess.id}/>);

    let newMessageBody = props.newMessageBody;

    let sendMessage = () => {
         props.sendMessage();
    };
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
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
                        <div>
                    <textarea name="mess"
                              value={newMessageBody}
                              onChange={onNewMessageChange}
                              placeholder='Enter your Message'
                             />
                            <div>
                                <button onClick={sendMessage}>New message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
