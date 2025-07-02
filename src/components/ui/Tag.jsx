import React from 'react';

const Tag = ({ 
  theme = 'default', 
  children, 
  size = 'default',
  style,
  ...props 
}) => {
  const colors = {
    success: { 
      bg: '#f6ffed', 
      color: '#52c41a', 
      border: '#b7eb8f' 
    },
    danger: { 
      bg: '#fff2f0', 
      color: '#ff4d4f', 
      border: '#ffccc7' 
    },
    warning: { 
      bg: '#fffbe6', 
      color: '#faad14', 
      border: '#ffe58f' 
    },
    processing: { 
      bg: '#e6f7ff', 
      color: '#1890ff', 
      border: '#91d5ff' 
    },
    error: { 
      bg: '#fff2f0', 
      color: '#ff4d4f', 
      border: '#ffccc7' 
    },
    default: { 
      bg: '#fafafa', 
      color: '#666', 
      border: '#d9d9d9' 
    }
  };
  
  const colorStyle = colors[theme] || colors.default;
  
  const baseStyle = {
    display: 'inline-block',
    padding: size === 'small' ? '1px 6px' : '2px 8px',
    borderRadius: '4px',
    fontSize: size === 'small' ? '11px' : '12px',
    fontWeight: '400',
    lineHeight: size === 'small' ? '16px' : '18px',
    backgroundColor: colorStyle.bg,
    color: colorStyle.color,
    border: `1px solid ${colorStyle.border}`,
    whiteSpace: 'nowrap',
    ...style
  };
  
  return (
    <span style={baseStyle} {...props}>
      {children}
    </span>
  );
};

export default Tag;