import { fromJS } from 'immutable';
import uiReducer, { initialState } from './uiReducer';
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  it('should return the initial state', () => {
    const state = uiReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState);
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({
      ...initialState,
      isNotificationDrawerVisible: true,
    });
  });

  it('should handle HIDE_NOTIFICATION_DRAWER', () => {
    const state = uiReducer(undefined, { type: HIDE_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({
      ...initialState,
      isNotificationDrawerVisible: false,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const state = uiReducer(undefined, { type: LOGIN_SUCCESS });
    expect(state.toJS()).toEqual({
      ...initialState,
      isUserLoggedIn: true,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const state = uiReducer(undefined, { type: LOGIN_FAILURE });
    expect(state.toJS()).toEqual({
      ...initialState,
      isUserLoggedIn: false,
    });
  });

  it('should handle LOGIN and update user in state', () => {
    const user = { name: 'Yvonne' };
    const state = uiReducer(undefined, { type: LOGIN, user });
    expect(state.toJS()).toEqual({
      ...initialState,
      user,
    });
  });

  it('should handle LOGOUT and reset user to null', () => {
    const initialStateWithUser = fromJS({
      ...initialState,
      user: { name: 'Yvonne' },
    });
    const state = uiReducer(initialStateWithUser, { type: LOGOUT });
    expect(state.toJS()).toEqual({
      ...initialState,
      user: null,
    });
  });
});
