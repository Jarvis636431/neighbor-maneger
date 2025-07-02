import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const TeamList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchTeamList();
  }, [pagination.current, pagination.pageSize]);

  const fetchTeamList = async () => {
    try {
      setLoading(true);
      // 模拟数据
      setTimeout(() => {
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => ({
          id: (pagination.current - 1) * pagination.pageSize + index + 1,
          name: `绿色环保队${(pagination.current - 1) * pagination.pageSize + index + 1}`,
          leader: `队长${index + 1}`,
          memberCount: Math.floor(Math.random() * 50) + 10,
          status: Math.random() > 0.3 ? 'approved' : 'pending',
          createTime: '2024-01-15 10:30:00',
          description: '致力于环保事业，推广绿色生活理念',
        }));
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 156 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取队伍列表失败:', error);
      alert('获取队伍列表失败');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchTeamList();
  };

  const handleViewDetail = (record) => {
    navigate(`/team/detail/${record.id}`);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      approved: { color: '#52c41a', text: '已通过' },
      pending: { color: '#faad14', text: '待审核' },
      rejected: { color: '#ff4d4f', text: '已拒绝' },
    };
    const config = statusMap[status] || { color: '#d9d9d9', text: '未知' };
    return (
      <span style={{
        padding: '2px 8px',
        borderRadius: '4px',
        backgroundColor: config.color,
        color: 'white',
        fontSize: '12px'
      }}>
        {config.text}
      </span>
    );
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    margin: '16px'
  };

  const searchContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    alignItems: 'center'
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    width: '300px',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #f0f0f0'
  };

  const thStyle = {
    backgroundColor: '#fafafa',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #f0f0f0',
    fontWeight: '500'
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #f0f0f0'
  };

  const viewButtonStyle = {
    padding: '4px 8px',
    backgroundColor: 'transparent',
    color: '#1890ff',
    border: '1px solid #1890ff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  };

  return (
    <div>
      <div style={cardStyle}>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="搜索队伍名称或队长"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={handleSearch}
            style={buttonStyle}
          >
            🔍 搜索
          </button>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>加载中...</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>队伍名称</th>
                <th style={thStyle}>队长</th>
                <th style={thStyle}>成员数量</th>
                <th style={thStyle}>状态</th>
                <th style={thStyle}>创建时间</th>
                <th style={thStyle}>描述</th>
                <th style={thStyle}>操作</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td style={tdStyle}>{row.id}</td>
                  <td style={tdStyle}>{row.name}</td>
                  <td style={tdStyle}>{row.leader}</td>
                  <td style={tdStyle}>{row.memberCount}人</td>
                  <td style={tdStyle}>{getStatusBadge(row.status)}</td>
                  <td style={tdStyle}>{row.createTime}</td>
                  <td style={tdStyle}>{row.description}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleViewDetail(row)}
                      style={viewButtonStyle}
                    >
                      👁️ 查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span>共 {pagination.total} 条记录</span>
        </div>
      </div>
    </div>
  );
};

export default TeamList;