import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const Sidebar = ({ showSidebar, handleShowSidebar, handleLogin }) => {
  const styles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      width: '100%',
      height: '100vh',
      zIndex: 5,
    },
    body: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      height: '100vh',
      backgroundColor: '#fff',
      // color: '#fff',
    },
    item: {
      padding: '.7rem',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '.3rem',
      borderBottom: '1px solid lightgrey',
    },
    icon: {
      marginRight: '.5rem',
    },
    scrim: {
      position: 'relative',
      width: '20%',
      height: '100vh',
      backgroundColor: 'black',
      opacity: '.5',
    },
  };

  const logOut = () => {
    handleShowSidebar(false);
    handleLogin();
  };

  return showSidebar ? (
    <div className="sidebar-container" style={styles.container}>
      <div className="sidebar-body" style={styles.body}>
        <div className="sidebar-menu-item" style={styles.item}>
          <AccountCircleOutlinedIcon style={styles.icon} />
          Asetukset
        </div>
        <div className="sidebar-menu-item" style={styles.item}>
          <PolicyOutlinedIcon style={styles.icon} />
          Tietosuoja
        </div>
        <div className="sidebar-menu-item" style={styles.item}>
          <InfoOutlinedIcon style={styles.icon} />
          Tietoja sovelluksesta
        </div>
        <div
          className="sidebar-menu-item"
          style={styles.item}
          role="button"
          tabIndex={0}
          onClick={logOut}
        >
          <ExitToAppOutlinedIcon style={styles.icon} />
          Kirjaudu ulos
        </div>
      </div>
      <div
        role="button"
        tabIndex={0}
        aria-label="close sidebar"
        onClick={handleShowSidebar}
        className="scrim"
        style={styles.scrim}
      />
    </div>
  ) : null;
};

Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  handleShowSidebar: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Sidebar;
