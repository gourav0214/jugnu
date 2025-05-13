
import React from 'react';

const Logo = ({ size = 'medium', type = 'full' }) => {
  const sizes = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-15',
  };

  return (
    <div >
      <img className={`${sizes[size]}`} src="public/transparent-logo.svg" alt="logo" />
    </div>
  );
};

export default Logo;