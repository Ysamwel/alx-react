import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Footer({ user }) {
  return (
    <footer>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
      {user.isLoggedIn && <a href='#'>Contact us</a>}
    </footer>
  );
}

// Define propTypes for user prop
Footer.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

// Define defaultProps in case user is not passed
Footer.defaultProps = {
  user: { isLoggedIn: false },
};

// mapStateToProps to retrieve the user from Redux state
const mapStateToProps = (state) => ({
  user: state.user, // Adjust according to your state shape
});

// Connecting the Footer component to Redux
export default connect(mapStateToProps)(Footer);
