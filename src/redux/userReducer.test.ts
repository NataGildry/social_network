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

