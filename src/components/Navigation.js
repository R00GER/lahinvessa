import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import img1 from '../assets/image0.png';
// import img2 from '../assets/image1.png';
// import img3 from '../assets/image2.png';
// import img4 from '../assets/image3.png';
// import img5 from '../assets/img4.png';
import img9 from '../assets/img9.png';

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
      backgroundColor: '#85cad4',
      zIndex: 1,
      opacity: '.85',
    },
    menuIcon: {
      gridColumnStart: 1,
      gridColumnEnd: 2,
      justifySelf: 'start',
      color: '#fff',
    },
    logoContainer: {
      gridColumnStart: 2,
      gridColumnEnd: 3,
      justifySelf: 'center',
    },
    logo: {
      width: '150px',
      zIndex: 50,
    },
    login: {
      gridColumnStart: 3,
      gridColumnEnd: 4,
      justifySelf: 'end',
      color: '#fff',
    },
  };

  return (
    <div className="navigation-container" style={styles.container}>
      <MenuIcon onClick={handleShowSidebar} style={styles.menuIcon} fontSize="large" />
      <Link to="/" style={styles.logoContainer}>
        <img src={img9} alt="Logo" style={styles.logo} />
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
