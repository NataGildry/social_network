import React from 'react';
import p from './Post.module.css';

type PropsType = {
    message: string,
    id: number,
    likeCouunt:number
};

const Post: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={`${p.post} ${p.active}`}>Post {props.id}</div>
            <div>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHZ6GOe3OJT-itGwpgTisGjN1f-nHPmBO2yg&usqp=CAU"
                    alt=""/>
            </div>
            {props.message}
        </div>
    );
};
export default Post;
