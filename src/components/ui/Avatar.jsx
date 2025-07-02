import React from 'react';

const Avatar = ({ 
  src, 
  alt = 'avatar',
  size = 'default',
  shape = 'circle',
  style,
  ...props 
}) => {
  const sizeMap = {
    small: '24px',
    default: '32px',
    large: '40px',
    xlarge: '64px'
  };
  
  const avatarSize = typeof size === 'number' ? `${size}px` : sizeMap[size] || sizeMap.default;
  
  const baseStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: shape === 'square' ? '6px' : '50%',
    objectFit: 'cover',
    backgroundColor: '#f5f5f5',
    border: '1px solid #e8e8e8',
    display: 'inline-block',
    ...style
  };
  
  return (
    <img 
      src={src} 
      alt={alt}
      style={baseStyle}
      {...props}
    />
  );
};

export default Avatar;