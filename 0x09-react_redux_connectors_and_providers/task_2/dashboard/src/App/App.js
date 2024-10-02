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
import { user, logOut, AppContext } from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer } from '../actions/uiActions';

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
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
    this.state = {
      user,
      logOut: this.logOut,
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
      this.state.logOut();
    }
  }

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({ user });
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter((notification) => notification.id !== id),
    });
  }

  render() {
    const { user, user: { isLoggedIn }, logOut, listNotifications } = this.state;
    const { displayDrawer, displayNotificationDrawer, hideNotificationDrawer } = this.props; // Redux props
    const value = { user, logOut };

    return (
      <AppContext.Provider value={value}>
        <Notifications
          listNotifications={listNotifications}
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
            <Login />
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

// Define propTypes for the new props passed from Redux
App.propTypes = {
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  displayDrawer: PropTypes.bool.isRequired,
};

// Define defaultProps in case props are not passed
App.defaultProps = {
  displayDrawer: false,
};

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
  isLoggedIn: state.ui.isLoggedIn,
  displayDrawer: state.ui.isNotificationDrawerVisible,
});

// mapDispatchToProps using the simplified version
const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
};

// Connecting the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
