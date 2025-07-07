import React from 'react';

const PageTable = ({ 
  columns, 
  data, 
  loading, 
  pagination, 
  onPaginationChange 
}) => {
  const handlePageChange = (page) => {
    if (onPaginationChange) {
      onPaginationChange({
        ...pagination,
        current: page
      });
    }
  };

  const handlePageSizeChange = (pageSize) => {
    if (onPaginationChange) {
      onPaginationChange({
        ...pagination,
        current: 1,
        pageSize: pageSize
      });
    }
  };

  const renderPagination = () => {
    if (!pagination) return null;
    
    const { current, pageSize, total } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const startItem = (current - 1) * pageSize + 1;
    const endItem = Math.min(current * pageSize, total);

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '16px',
        padding: '16px 0'
      }}>
        <div style={{ color: '#666', fontSize: '14px' }}>
          显示 {startItem}-{endItem} 条，共 {total} 条
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current <= 1}
            style={{
              padding: '4px 8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: current <= 1 ? '#f5f5f5' : '#fff',
              cursor: current <= 1 ? 'not-allowed' : 'pointer'
            }}
          >
            上一页
          </button>
          
          {(() => {
            const maxVisible = 10;
            const pages = [];
            
            if (totalPages <= maxVisible) {
              // 如果总页数不超过最大显示数，显示所有页码
              for (let i = 1; i <= totalPages; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      backgroundColor: i === current ? '#1890ff' : '#fff',
                      color: i === current ? '#fff' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {i}
                  </button>
                );
              }
            } else {
              // 页数过多时的处理逻辑
              const halfVisible = Math.floor((maxVisible - 3) / 2); // 减去首页、末页和省略号的位置
              
              // 始终显示第一页
              pages.push(
                <button
                  key={1}
                  onClick={() => handlePageChange(1)}
                  style={{
                    padding: '4px 8px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    backgroundColor: 1 === current ? '#1890ff' : '#fff',
                    color: 1 === current ? '#fff' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  1
                </button>
              );
              
              let startPage, endPage;
              
              if (current <= halfVisible + 2) {
                // 当前页靠近开始
                startPage = 2;
                endPage = maxVisible - 2;
              } else if (current >= totalPages - halfVisible - 1) {
                // 当前页靠近结束
                startPage = totalPages - maxVisible + 3;
                endPage = totalPages - 1;
              } else {
                // 当前页在中间
                startPage = current - halfVisible;
                endPage = current + halfVisible;
              }
              
              // 添加左侧省略号
              if (startPage > 2) {
                pages.push(
                  <span key="left-ellipsis" style={{ padding: '4px 8px', color: '#999' }}>...</span>
                );
              }
              
              // 添加中间页码
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      backgroundColor: i === current ? '#1890ff' : '#fff',
                      color: i === current ? '#fff' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {i}
                  </button>
                );
              }
              
              // 添加右侧省略号
              if (endPage < totalPages - 1) {
                pages.push(
                  <span key="right-ellipsis" style={{ padding: '4px 8px', color: '#999' }}>...</span>
                );
              }
              
              // 始终显示最后一页
              if (totalPages > 1) {
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      backgroundColor: totalPages === current ? '#1890ff' : '#fff',
                      color: totalPages === current ? '#fff' : '#333',
                      cursor: 'pointer'
                    }}
                  >
                    {totalPages}
                  </button>
                );
              }
            }
            
            return pages;
          })()}
          
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current >= totalPages}
            style={{
              padding: '4px 8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              backgroundColor: current >= totalPages ? '#f5f5f5' : '#fff',
              cursor: current >= totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            下一页
          </button>
          
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              marginLeft: '16px'
            }}
          >
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
            <option value={50}>50条/页</option>
          </select>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666'
      }}>
        加载中...
      </div>
    );
  }

  return (
    <div>
      <div style={{
        border: '1px solid #e8e8e8',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              {columns.map((column, index) => (
                <th
                  key={index}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#262626',
                    borderBottom: '1px solid #e8e8e8',
                    width: column.width || 'auto'
                  }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{
                    borderBottom: '1px solid #e8e8e8',
                    ':hover': { backgroundColor: '#f5f5f5' }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: '12px 16px',
                        color: '#262626'
                      }}
                    >
                      {column.cell ? column.cell({ row, value: row[column.colKey || column.key] }) : row[column.colKey || column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: '40px',
                    textAlign: 'center',
                    color: '#999'
                  }}
                >
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </div>
  );
};

export default PageTable;