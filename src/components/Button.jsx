import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  fullWidth = false,
  disabled = false,
  icon
}) => {
  const variants = {
    primary: 'bg-jugnu-red hover:bg-opacity-90 text-white',
    secondary: 'bg-jugnu-dark hover:bg-opacity-90 text-white',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700'
  };

  const sizes = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-semibold transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex items-center justify-center
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

