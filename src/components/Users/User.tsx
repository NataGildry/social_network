import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/240administrator-male.png';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../types/types';

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
};

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
                   <span>
                       <div>
                           <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""
                                     className={styles.userPhoto}/>
                           </NavLink>

                       </div>
                       <div>
                           {user.followed
                               ? <button disabled={followingInProgress
                                   .some(id => id === user.id)} onClick={() => {
                                   unfollow(user.id);
                                   // props.toggleFollowingInProgress(true, u.id);
                                   // usersAPI.unfollow(u.id)
                                   //     .then(response => {
                                   //         if (response.data.resultCode === 0) {
                                   //             props.unfollow(u.id)
                                   //         }
                                   //         props.toggleFollowingInProgress(false, u.id);
                                   //     });
                               }}>Unfollow</button>
                               : <button disabled={followingInProgress
                                   .some(id => id === user.id)} onClick={() => {
                                   follow(user.id);
                                   // props.toggleFollowingInProgress(true, u.id);
                                   // usersAPI.follow(u.id)
                                   //     .then(response => {
                                   //         if (response.data.resultCode === 0) {
                                   //             props.follow(u.id)
                                   //         }
                                   //         props.toggleFollowingInProgress(false, u.id);
                                   //     });
                               }}>Follow</button>}
                                   </div>
                                   </span>
            <span>
                                   <span>
                                   <div>{user.name}</div>
                                   <div>{user.status}</div>
                                   </span>
                                   <span>
                                   <div>{"user.location.country"}</div>
                                   <div>{"user.location.city"}</div>
                                   </span>
                                   </span>
        </div>
    )
};

export default User;
