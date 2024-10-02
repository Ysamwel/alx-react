import { shallow } from 'enzyme';
import React from 'react';
import App, { listNotificationsInitialState } from './App';
import { StyleSheetTestUtils } from 'aphrodite';
import { user, logOut, AppContext } from './AppContext';
import { mapStateToProps } from './App';
import { fromJS } from 'immutable';

describe('<App />', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('contains Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('contains Login component when user is not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('contains Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer')).toHaveLength(1);
  });

  it('does not contain CourseList when user is not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('CourseList')).toHaveLength(0);
  });

  it('contains CourseList component when user is logged in', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find('CourseList')).toHaveLength(1);
  });

  it('calls logOut and shows alert when ctrl+h is pressed', () => {
    const logOut = jest.fn();
    const wrapper = shallow(<App logOut={logOut} />);
    const alert = jest.spyOn(global, 'alert').mockImplementation(() => {});
    
    const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
    window.dispatchEvent(event);

    expect(alert).toHaveBeenCalledWith('Logging you out');
    expect(logOut).toHaveBeenCalled();
    
    alert.mockRestore();
  });

  // No need to test handleDisplayDrawer and handleHideDrawer
  // As these are handled via Redux and not part of App's local state anymore

  it('<AppContext.Provider /> renders correctly', () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});

describe('mapStateToProps', () => {
  it('should return the correct isLoggedIn value from state', () => {
    const state = fromJS({
      ui: {
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      },
    });
    const expectedProps = { isLoggedIn: true, displayDrawer: false };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });

  it('should return the correct displayDrawer value from state', () => {
    const state = fromJS({
      ui: {
        isUserLoggedIn: false,
        isNotificationDrawerVisible: true,
      },
    });
    const expectedProps = { isLoggedIn: false, displayDrawer: true };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
