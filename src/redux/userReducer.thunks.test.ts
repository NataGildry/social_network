import {actions, follow, unfollow} from './userReducer';
import {usersAPI} from '../api/users -api';
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
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
});


usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

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
