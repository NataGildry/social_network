import React from "react";
import di from './Dialog.module.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let path = "/messages/" + props.id;
    return (
        <div>
            <div className={di.item}>
                <NavLink to={path} activeClassName={di.active}>{props.name}</NavLink>
            </div>
        </div>
    );
};

export default DialogItem;
