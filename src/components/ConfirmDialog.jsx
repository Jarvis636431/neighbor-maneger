import React from 'react';
import { Dialog, Button } from 'tdesign-react';

const ConfirmDialog = ({
  visible,
  title = '确认操作',
  content = '确定要执行此操作吗？',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <Dialog
      visible={visible}
      header={title}
      onClose={onCancel}
      footer={
        <div>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button theme="primary" onClick={onConfirm} loading={loading} style={{ marginLeft: '8px' }}>
            {confirmText}
          </Button>
        </div>
      }
    >
      <div>{content}</div>
    </Dialog>
  );
};

export default ConfirmDialog;