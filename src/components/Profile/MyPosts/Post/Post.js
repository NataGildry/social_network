import React from 'react';
import p from './Post.module.css';

const Post =(props) => {
    return (
        <div>
            <div className={`${p.post} ${p.active}`}>Post {props.id}</div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHZ6GOe3OJT-itGwpgTisGjN1f-nHPmBO2yg&usqp=CAU" alt=""/>
            </div>
            {props.message}
        </div>
    );
};
export default Post;
