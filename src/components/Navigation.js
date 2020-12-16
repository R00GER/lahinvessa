import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from '../assets/logo.png';

const Navigation = ({ handleShowSidebar, user }) => {
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'grid',
      gridTemplateColumns: '25% 50% 25%',
      gridTemplateRows: '1fr',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '8vh',
      padding: '0 .5rem 0 .5rem',
      // backgroundColor: '#85cad4',
      zIndex: 6,
    },
    menuIcon: {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      justifySelf: 'start',
      color: '#0A95A8',
      // color: '#8127BA',
      zIndex: 6,
    },
    logoContainer: {
      gridColumnStart: 2,
      gridColumnEnd: 3,
      justifySelf: 'center',
    },
    logo: {
      width: '150px',
      zIndex: 8,
    },
    login: {
      gridColumnStart: 3,
      gridColumnEnd: 4,
      justifySelf: 'end',
      // color: '#80BDC6',
      color: '#0A95A8',
    },
  };

  return (
    <div className="navigation-container" style={styles.container}>
      <MenuIcon onClick={handleShowSidebar} style={styles.menuIcon} fontSize="large" />
      <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </Link>
      {!user && (
        <Link to="/login" style={styles.login}>
          <AccountCircleIcon fontSize="large" />
        </Link>
      )}
    </div>
  );
};

Navigation.defaultProps = {
  user: null,
};

Navigation.propTypes = {
  handleShowSidebar: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object),
};

export default Navigation;
