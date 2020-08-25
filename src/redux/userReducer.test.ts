import userReducer, {actions, InitialStateType} from './userReducer';

let state: InitialStateType;

beforeEach(() => {
        state = {
            users: [
                {
                    id: 0, name: 'Nata', followed: false,
                    photos: {small: null, large: null}, status: 'status'
                },
                {
                    id: 1, name: 'Nata 1', followed: false,
                    photos: {small: null, large: null}, status: 'status 1'
                },
                {
                    id: 2, name: 'Nata 2', followed: true,
                    photos: {small: null, large: null}, status: 'status 2'
                },
                {
                    id: 3, name: 'Nata 4', followed: true,
                    photos: {small: null, large: null}, status: 'status 3'
                }
            ],
            pageSize: 10,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: []
        };
    }
);
test('follow success', () => {
    const newState = userReducer(state, actions.followSuccses(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});
test('unfollow success', () => {
    const newState = userReducer(state, actions.unfollowSuccses(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});
test('set current page', () => {
    const newState = userReducer(state, actions.setCurrentPage(12));

    expect(newState.currentPage).toBe(12);
});
test('toggle is fetching', () => {
    const newState = userReducer(state, actions.toggleIsFetching(true));
    expect(newState.isFetching).toBeTruthy();
});
test('set total users count', () => {
    const newState = userReducer(state, actions.setTotalUsersCount(100));
    expect(newState.totalUsersCount).toBe(100);
});

