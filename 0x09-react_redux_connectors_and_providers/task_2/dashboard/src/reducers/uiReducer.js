import { Map } from 'immutable';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions/uiActionTypes';

export const initialState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null,  // Set initial user state to null
};

const uiReducer = (state = Map(initialState), action) => {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);

    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);

    case LOGIN_SUCCESS:
      return state.set('isUserLoggedIn', true);

    case LOGIN_FAILURE:
      return state.set('isUserLoggedIn', false);

    case LOGIN:
      // Set the user passed in the action payload
      return state.set('user', action.user);

    case LOGOUT:
      // Set the user to null when logging out
      return state.set('isUserLoggedIn', false).set('user', null);

    default:
      break;
  }
  return state;
};

export default uiReducer;
