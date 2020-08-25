import {actions, follow, getUsersThunkCreator, unfollow} from './userReducer';
import {GetUsersResponseType, usersAPI} from '../api/users -api';
import {ResponsesType, ResultCodeEnum} from '../api/api';

jest.mock('../api/users -api');
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ResponsesType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.Success
};
const resultGetUsers:  GetUsersResponseType = {
    items: [],
    totalCount: 50,
    error: 'some error'
};
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
});


usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
usersAPIMock.getUsers.mockReturnValue(Promise.resolve(resultGetUsers));

test('success follow thunk', async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(1,
        actions.toggleFollowingInProgress(true, 1));

    expect(dispatchMock).toHaveBeenNthCalledWith(2,
        actions.followSuccses(1));

    expect(dispatchMock).toHaveBeenNthCalledWith(3,
        actions.toggleFollowingInProgress(false, 1));
});
test('success unfollow thunk', async () => {
    const thunk = unfollow(1);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(1,
        actions.toggleFollowingInProgress(true, 1));

    expect(dispatchMock).toHaveBeenNthCalledWith(2,
        actions.unfollowSuccses(1));

    expect(dispatchMock).toHaveBeenNthCalledWith(3,
        actions.toggleFollowingInProgress(false, 1));
});
test('get users thunk', async () => {
    const thunk = getUsersThunkCreator(1, 10);

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(5);

    expect(dispatchMock).toHaveBeenNthCalledWith(1,
        actions.toggleIsFetching(true));

    expect(dispatchMock).toHaveBeenNthCalledWith(2,
        actions.setCurrentPage(1));

    expect(dispatchMock).toHaveBeenNthCalledWith(3,
        actions.toggleIsFetching(false));

    expect(dispatchMock).toHaveBeenNthCalledWith(4,
        actions.setUsers([]));
    expect(dispatchMock).toHaveBeenNthCalledWith(5,
        actions.setTotalUsersCount(50));
});
