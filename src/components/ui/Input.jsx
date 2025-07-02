import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  size = 'default',
  disabled = false,
  style,
  ...props 
}) => {
  const baseStyle = {
    width: '100%',
    padding: size === 'small' ? '6px 10px' : size === 'large' ? '12px 16px' : '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    backgroundColor: disabled ? '#f5f5f5' : '#fff',
    color: disabled ? '#999' : '#333',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    ...style
  };
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };
  
  const handleFocus = (e) => {
    e.target.style.borderColor = '#1890ff';
    e.target.style.boxShadow = '0 0 0 2px rgba(24, 144, 255, 0.2)';
  };
  
  const handleBlur = (e) => {
    e.target.style.borderColor = '#d9d9d9';
    e.target.style.boxShadow = 'none';
  };
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      style={baseStyle}
      {...props}
    />
  );
};

export default Input;