import React, {FC} from 'react';
import di from './Dialog.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    name: string
    id: number
    key:number
};

export const DialogItem: FC<PropsType> = (props) => {
    let path = "/messages/" + props.id;
    return (
        <div>
            <div className={di.item}>
                <NavLink to={path} activeClassName={di.active}>{props.name}</NavLink>
            </div>
        </div>
    );
};
