import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navigation = ({ handleShowSidebar }) => {
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '8vh',
      padding: '0 .5rem 0 .5rem',
      backgroundColor: '#85cad4',
      zIndex: 1,
      opacity: '.85',
    },
    menuIconContainer: {
      padding: '0.08rem',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#0A95A8',
      borderRadius: '2px',
      // border: '1px solid red',
    },
    menuIcon: {
      color: '#fff',
    },
  };

  return (
    <div className="navigation-container" style={styles.container}>
      <MenuIcon onClick={handleShowSidebar} style={styles.menuIcon} fontSize="large" />
      <Link to="/login">
        <AccountCircleIcon style={styles.menuIcon} fontSize="large" />
      </Link>
    </div>
  );
};

Navigation.propTypes = {
  handleShowSidebar: PropTypes.func.isRequired,
};

export default Navigation;
