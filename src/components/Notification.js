import React from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Notification = ({ errorNotification, handleErrorNotifications }) => {
  const styles = {
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'grid',
      // flexDirection: 'column',
      gridTemplateColums: '80% 20%',
      gridTemplateRows: '2fr',
      width: '75%',
      backgroundColor: '#fff',
      color: '#0A95A8',
      borderRadius: '5px',
      zIndex: 3,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
    },
    close: {
      gridColumnStart: 2,
      gridRowStart: 1,
      paddingTop: '.1rem',
      paddingRight: '.1rem',
      opacity: '.8',
    },
    body: {
      padding: '.5rem 1rem 1rem 1rem',
    },
  };

  const closeModal = () => {
    handleErrorNotifications(null, false);
  };

  return (
    <>
      <div
        className="overlay"
        role="button"
        tabIndex={0}
        aria-label="Close"
        style={styles.overlay}
        onClick={closeModal}
      />
      <div className="notification-container" style={styles.container}>
        <div className="notification-close" style={styles.close}>
          <HighlightOffIcon className="notification-close-item" onClick={closeModal} />
        </div>
        <div className="notification-body" style={styles.body}>
          <div className="notification-message-item">{errorNotification.message}</div>
        </div>
      </div>
    </>
  );
};

Notification.propTypes = {
  errorNotification: PropTypes.instanceOf(Object).isRequired,
  handleErrorNotifications: PropTypes.func.isRequired,
};

export default Notification;
