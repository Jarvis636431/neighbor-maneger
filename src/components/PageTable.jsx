import React from 'react';
import { Table, Pagination, Loading } from 'tdesign-react';

const PageTable = ({
  data = [],
  columns = [],
  loading = false,
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  onPageChange,
  rowKey = 'id',
  ...tableProps
}) => {
  const handlePageChange = (pageInfo) => {
    if (onPageChange) {
      onPageChange(pageInfo);
    }
  };

  return (
    <div>
      <Loading loading={loading}>
        <Table
          data={data}
          columns={columns}
          rowKey={rowKey}
          pagination={false}
          {...tableProps}
        />
      </Loading>
      {pagination.total > 0 && (
        <div style={{ marginTop: '16px', textAlign: 'right' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showJumper
            showSizer
            pageSizeOptions={[10, 20, 50, 100]}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default PageTable;