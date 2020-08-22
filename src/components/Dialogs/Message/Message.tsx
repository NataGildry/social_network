import React, {FC} from 'react';
import m from './Message.module.css';

type PropsType = {
    message: string
    key: number
    id: number
};

const Message: FC<PropsType> = (props) => {
    return (
        <div>
            <div className={m.message}>{props.message}</div>
        </div>
    );
};

export default Message;
