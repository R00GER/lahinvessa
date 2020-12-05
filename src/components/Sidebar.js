import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ showSidebar, handleShowSidebar }) => {
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
      width: '80%',
      height: '100vh',
      backgroundColor: '#fff',
    },
    scrim: {
      position: 'relative',
      width: '20%',
      height: '100vh',
      backgroundColor: 'black',
      opacity: '.5',
    },
  };

  return showSidebar ? (
    <div className="sidebar-container" style={styles.container}>
      <div className="sidebar-body" style={styles.body}>
        test
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
  handleShowSidebar: PropTypes.isRequired,
};

export default Sidebar;
