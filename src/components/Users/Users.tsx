import React, {useEffect} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UsersSearchForm} from './UsersSearchForm';
import {FilterType, getUsersThunkCreator} from '../../redux/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/UsersSelectors';

type PropsType = {
};

export const Users: React.FC<PropsType> = ({...props}) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    // componentDidMount() {
    //     const {currentPage, pageSize, filter} = this.props;
    //     this.props.getUsers(currentPage, pageSize, filter);
    //     //Code without THUNK
    //     // this.props.toggleIsFetching(true);
    //     // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
    //     //     this.props.toggleIsFetching(false);
    //     //     this.props.setUsers(data.items);
    //     //     this.props.setTotalUsersCount(data.totalCount);
    //     // })
    // }
    // method to replace componentDidMount
    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter));
    }, []);

    const dispatch = useDispatch();

    const onPageChange = (pageNumber:number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    };
    const follow = (userId: number) => {
        dispatch(follow(userId));
    };
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    };
    return <div>
        <UsersSearchForm  onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChange={onPageChange} pageSize={pageSize}
                   totalItemsCount={totalUsersCount}/>
        <div>
            {
                users.map(u => <User
                    user={u} followingInProgress={followingInProgress}
                    unfollow={unfollow} follow={follow}
                    key={u.id}/>
                )
            }
        </div>
    </div>
};

export default Users;
