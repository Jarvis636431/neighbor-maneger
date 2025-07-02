import React from 'react';

const Card = ({ children, style, ...props }) => {
  return (
    <div 
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e8e8e8',
        ...style
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;