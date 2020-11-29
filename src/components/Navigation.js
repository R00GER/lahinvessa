import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

const Navigation = () => {
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
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
      <MenuIcon style={styles.menuIcon} fontSize="large" />
    </div>
  );
};

export default Navigation;
