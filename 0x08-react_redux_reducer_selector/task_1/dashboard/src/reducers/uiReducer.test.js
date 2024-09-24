import { uiReducer } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { Map } from 'immutable';

//The initial state
const initialState = Map({
isNotificationDrawerVisible: false,
isUserLoggedIn: false,
user: {}
});

describe('uiReducer', () => {

    it('return the initial state when no action is passed', () => {
        const result = uiReducer(undefined, {});
        expect(result.toJS()).toEqual(initialState.toJS());
    });

    it('return the initial state when an unknow action (SELECT_COURSE) is passed', () => {
        const result = uiReducer(undefined, { type: 'SELECT_COURSE' });
        expect(result.toJS()).toEqual(initialState.toJS());
    });

    it('update isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
        const result = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
        expect(result.toJS()).toEqual({
            isNotificationDrawerVisible: true,
            isUserLoggedIn: false,
            user: {}
        });
    });
});

