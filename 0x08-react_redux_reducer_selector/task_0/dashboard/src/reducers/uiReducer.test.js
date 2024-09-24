import { uiReducer } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';

//The initial state
const initialState = {
isNotificationDrawerVisible: false,
isUserLoggedIn: false,
user: {}
};

describe('uiReducer', () => {

    it('return the initial state when no action is passed', () => {
        const result = uiReducer(undefined, {});
        expect(result).toEqual(initialState);
    });

    it('return the initial state when an unknow action (SELECT_COURSE) is passed', () => {
        const result = uiReducer(undefined, { type: 'SELECT_COURSE' });
        expect(result).toEqual(initialState);
    });

    it('update isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
        const result = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
        expect(result).toEqual({
            ...initialState,
            isNotificationDrawerVisible: true,
        });
    });
});
