import React from 'react';

const Space = ({ 
  children, 
  direction = 'horizontal',
  size = 'default',
  align = 'center',
  wrap = false,
  style,
  ...props 
}) => {
  const sizeMap = {
    small: '4px',
    default: '8px',
    large: '16px'
  };
  
  const gap = typeof size === 'number' ? `${size}px` : sizeMap[size] || sizeMap.default;
  
  const baseStyle = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: direction === 'vertical' ? 'stretch' : align,
    gap: gap,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style
  };
  
  return (
    <div style={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default Space;