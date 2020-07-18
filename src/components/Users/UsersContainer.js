import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    getUsersThunkCreator,
    setCurrentPage,
    toggleFollowingInProgress,
    unfollow
} from '../../redux/userReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


class UsersContainer extends Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        //Code without THUNK
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        //     this.props.setTotalUsersCount(data.totalCount);
        // })
    }

    onPageChange = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        //Code without THUNK
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false);
        //     this.props.setUsers(data.items);
        // })
    };

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                   followingInProgress={this.props.followingInProgress}

            />
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
};
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


export default compose(connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingInProgress,
    getUsers: getUsersThunkCreator
}), withAuthRedirect)(UsersContainer);

