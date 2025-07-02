import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  theme = 'default', 
  icon, 
  onClick, 
  loading = false,
  disabled = false,
  style,
  ...props 
}) => {
  const baseStyle = {
    padding: size === 'small' ? '4px 8px' : size === 'large' ? '12px 24px' : '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
    ...style
  };
  
  let themeStyle = {};
  
  if (theme === 'primary') {
    themeStyle = {
      backgroundColor: variant === 'outline' ? 'transparent' : variant === 'text' ? 'transparent' : '#1890ff',
      color: variant === 'outline' || variant === 'text' ? '#1890ff' : '#fff',
      border: variant === 'outline' ? '1px solid #1890ff' : 'none'
    };
  } else if (theme === 'danger') {
    themeStyle = {
      backgroundColor: variant === 'outline' ? 'transparent' : variant === 'text' ? 'transparent' : '#ff4d4f',
      color: variant === 'outline' || variant === 'text' ? '#ff4d4f' : '#fff',
      border: variant === 'outline' ? '1px solid #ff4d4f' : 'none'
    };
  } else if (theme === 'success') {
    themeStyle = {
      backgroundColor: variant === 'outline' ? 'transparent' : variant === 'text' ? 'transparent' : '#52c41a',
      color: variant === 'outline' || variant === 'text' ? '#52c41a' : '#fff',
      border: variant === 'outline' ? '1px solid #52c41a' : 'none'
    };
  } else {
    // default theme
    if (variant === 'outline') {
      themeStyle = {
        backgroundColor: 'transparent',
        color: '#666',
        border: '1px solid #d9d9d9'
      };
    } else if (variant === 'text') {
      themeStyle = {
        backgroundColor: 'transparent',
        color: '#666'
      };
    } else {
      themeStyle = {
        backgroundColor: '#f5f5f5',
        color: '#333',
        border: '1px solid #d9d9d9'
      };
    }
  }
  
  return (
    <button 
      style={{ ...baseStyle, ...themeStyle }} 
      onClick={onClick} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '...' : icon}
      {loading ? (typeof children === 'string' ? `${children}中...` : children) : children}
    </button>
  );
};

export default Button;