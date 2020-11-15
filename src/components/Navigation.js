import React from 'react';
import PoopIcon from '../components/PoopIcon';

const Navigation = () => {
  const styles = {
    // fixed
    width: '100%',
    height: '8vh',
    backgroundColor: '#85cad4',
    // opacity: .5,
  }

  return (
    <div className="navigation" style={styles}>
      <PoopIcon />
    </div>
  )
}

export default Navigation;