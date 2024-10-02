import React, { Component } from 'react';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import { AppContext } from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActions';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

export const listNotificationsInitialState = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.state = {
      listNotifications: listNotificationsInitialState,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleLogout);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleLogout);
  }

  handleLogout(e) {
    if (e.key === 'h' && e.ctrlKey) {
      alert('Logging you out');
      this.props.logout(); // Use the Redux action for logout
    }
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter((notification) => notification.id !== id),
    });
  }

  render() {
    const { user, isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } = this.props;
    const value = { user, logOut: logout };

    return (
      <AppContext.Provider value={value}>
        <Notifications
          listNotifications={this.state.listNotifications}
          displayDrawer={displayDrawer} // Redux prop
          handleDisplayDrawer={displayNotificationDrawer} // Redux action passed as prop
          handleHideDrawer={hideNotificationDrawer} // Redux action passed as prop
          markNotificationAsRead={this.markNotificationAsRead}
        />
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList listCourses={listCourses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login login={loginRequest} /> {/* Use loginRequest passed as a prop */}
          </BodySectionWithMarginBottom>
        )}
        <BodySection title='News from the School'>
          <p className={css(styles.p)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ullam? Quisquam eos temporibus, voluptate error, sunt consectetur ducimus eaque dolorum sit excepturi doloribus officiis reprehenderit distinctio dignissimos adipisci a aspernatur.
          </p>
        </BodySection>
        <div className={css(styles.footer)}>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  displayDrawer: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

App.defaultProps = {
  displayDrawer: false,
};

// Styling with Aphrodite
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    fontStyle: 'italic',
    borderTop: 'thick solid #e0344a',
  },
  p: {
    marginTop: 0,
  },
});

// mapStateToProps function to retrieve Redux state
const mapStateToProps = (state) => ({
  isLoggedIn: state.isUserLoggedIn, // Adjust according to your state shape
  displayDrawer: state.isNotificationDrawerVisible,
});

// mapDispatchToProps connecting Redux actions
const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
};

// Connecting the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
