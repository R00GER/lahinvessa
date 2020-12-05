import React from 'react';

const NewLocationAddedModal = ({ modalTitle, modalBody }) => {
  const styles = {
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // display: 'flex',
      width: '75%',
      padding: '1rem',
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
  };

  const closeModal = () => {
    console.log('clicked');
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
      <div className="new-location-modal-container" style={styles.container}>
        <div className="new-location-modal-title">{modalTitle}</div>
        <div className="new-location-modal-body">{modalBody}</div>
      </div>
    </>
  );
};

export default NewLocationAddedModal;
