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
import {useHistory} from 'react-router-dom';
import * as queryString from 'querystring';


type PropsType = {};
type QueryParamsType = {term?: string; page?:string; friend?:string};

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
        const {search} = history.location;
        const parsed = queryString.parse(search.substring(1)) as QueryParamsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if (parsed.page) actualPage = Number(parsed.page);

        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null};
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true};
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false};
                break;
        }
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {};
        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const dispatch = useDispatch();
    const history = useHistory();

    const onPageChange = (pageNumber: number) => {
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
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
