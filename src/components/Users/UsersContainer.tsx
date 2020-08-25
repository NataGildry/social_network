import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    getUsersThunkCreator,
    actions,
    // ----- from userReducer - actions,
    // setCurrentPage,
    // toggleFollowingInProgress,
    unfollow, FilterType
} from '../../redux/userReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from '../../redux/UsersSelectors';
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

//type MapStateToPropsType = ReturnType<typeof mapStateToProps>;

type MapStateToPropsType ={
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount:number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType
};

type MapDispatchPropsType ={
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setCurrentPage: (currentPage: number) => void,
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => void,
    getUsers: (currentPage: number, pageSize:number, filter: FilterType) => void
};
type OwnPropsType ={
    pageTitle: string,
};

type PropsType =  MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends Component<PropsType> {
    componentDidMount() {
       const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
        //Code without THUNK
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        //     this.props.setTotalUsersCount(data.totalCount);
        // })
    }

    onPageChange = (pageNumber:number) => {
        const {pageSize, filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
        //Code without THUNK
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        // })
    };
    onFilterChanged = (filter : FilterType) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter);
    };

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onFilterChanged={this.onFilterChanged }
                //toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                   followingInProgress={this.props.followingInProgress}

            />
        </>

    }
}
const mapStateToProps = (state: AppStateType):MapStateToPropsType=> {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
};
const mapDispatchToProps: MapDispatchPropsType = {
    follow,
    unfollow,
    setCurrentPage: actions.setCurrentPage,
    toggleFollowingInProgress: actions.toggleFollowingInProgress,
    getUsers: getUsersThunkCreator
};
// ----- mapStateToProps & mapDispatchToProps
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// };
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followActionCreator(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowActionCreator(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersActionCreator(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageActionCreator(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountActionCreator(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingActionCreator(isFetching))
//         }
//
//     }
// };


export default compose<React.ComponentType>(
    //TStateProps ={}, TDispatchProps = {}, TOwnProps ={}
    connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
            mapDispatchToProps
        //{
    // follow,
    // unfollow,
    // setCurrentPage,
    // toggleFollowingInProgress,
    // getUsers: getUsersThunkCreator
//}
))(UsersContainer);

