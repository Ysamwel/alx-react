import React, { Component } from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../actions/uiActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logOut(); // Dispatch the logout action creator
  }

  render() {
    const { user } = this.props; // Use the user prop from Redux

    return (
      <header className={css(styles.header)}>
        <img className={css(styles.logo)} src={logo} alt='logo' />
        <h1 className={css(styles.title)}>School dashboard</h1>
        {user.isLoggedIn && (
          <p id='logoutSection' className={css(styles.logoutSection)}>
            Welcome <b>{`${user.email} `}</b>
            <span onClick={this.handleLogout} className={css(styles.logoutSectionSpan)}>
              (logout)
            </span>
          </p>
        )}
      </header>
    );
  }
}

const screenSize = {
  small: '@media screen and (max-width: 900px)',
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    color: '#e0344a',
    alignItems: 'center',
    borderBottom: 'thick solid #e0344a',
    width: '100%',
    position: 'fixed',
  },
  logo: {
    width: '144px',
    [screenSize.small]: {
      width: '240px',
    },
  },
  title: {
    margin: 0,
    [screenSize.small]: {
      fontSize: '40px',
    },
  },
  logoutSection: {
    color: 'black',
    position: 'absolute',
    right: 0,
    paddingRight: '20px',
    alignSelf: 'flex-end',
  },
  logoutSectionSpan: {
    fontStyle: 'italic',
    cursor: 'pointer',
  },
});

// Define propTypes for user and logOut props
Header.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
};

// mapStateToProps to retrieve the user from Redux state
const mapStateToProps = (state) => ({
  user: state.user,
});

// Connecting the Header component to Redux and logOut action
export default connect(mapStateToProps, { logOut })(Header);
