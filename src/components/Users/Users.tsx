import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from '../../types/types';
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/userReducer";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (pageNumber:number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onFilterChanged: (filter: FilterType) => void
};

let Users: React.FC<PropsType> = ({currentPage,
                                      onPageChange,
                                      totalUsersCount,
                                      pageSize,
                                      users,
                                      onFilterChanged,
                                      ...props}) => {
    return <div>
        <UsersSearchForm  onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChange={onPageChange} pageSize={pageSize}
                   totalItemsCount={totalUsersCount}/>
        <div>
            {
                users.map(u => <User
                    user={u} followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow} follow={props.follow}
                    key={u.id}/>
                )
            }
        </div>
    </div>
};

export default Users;
