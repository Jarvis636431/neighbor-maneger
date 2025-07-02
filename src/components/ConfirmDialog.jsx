import React from 'react';

const ConfirmDialog = ({ 
  visible, 
  title, 
  content, 
  onConfirm, 
  onCancel, 
  loading 
}) => {
  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        minWidth: '400px',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        {title && (
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#262626',
            marginBottom: '16px'
          }}>
            {title}
          </div>
        )}
        
        {content && (
          <div style={{
            fontSize: '14px',
            color: '#595959',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            {content}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: '8px 16px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              backgroundColor: '#fff',
              color: '#262626',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: loading ? '#91d5ff' : '#1890ff',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? '处理中...' : '确定'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;