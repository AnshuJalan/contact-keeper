import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, logout, isAuthenticated } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <ul>
        <li>Hello, {user && user.name}</li>
        <li>
          <a href='#!' onClick={onLogout}>
            <i className='fa fa-sign-out' /> logout
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h2>
        <i className={props.icon} /> {props.title}
      </h2>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  icon: 'fa fa-id-card',
  title: 'Contact Keeper',
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Navbar;
