import React from 'react';

const Select = ({ 
  placeholder, 
  value, 
  onChange, 
  options = [],
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
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: '32px',
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
    <select
      value={value || ''}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      style={baseStyle}
      {...props}
    >
      {placeholder && (
        <option value="" disabled={!!value}>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={option.value || index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;