import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../components/PageTable';
import ConfirmDialog from '../components/ConfirmDialog';
import { Card, Button, Input, Tag, Select, Space, Avatar } from '../components/ui';

// 模拟图标组件
const SearchIcon = () => <span>🔍</span>;
const ViewIcon = () => <span>👁️</span>;
const BanIcon = () => <span>🚫</span>;
const CheckCircleIcon = () => <span>✅</span>;

const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: '',
    content: '',
    onConfirm: null,
    loading: false,
  });

  const statusOptions = [
    { label: '全部状态', value: '' },
    { label: '正常', value: 'active' },
    { label: '禁用', value: 'banned' },
    { label: '待审核', value: 'pending' },
  ];

  useEffect(() => {
    fetchUserList();
  }, [pagination.current, pagination.pageSize]);

  const fetchUserList = async () => {
    try {
      setLoading(true);
      
      // 立即设置模拟数据，不使用setTimeout
      const statuses = ['active', 'banned', 'pending'];
      const mockData = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        username: `user${index + 1}`,
        nickname: `绿邻居${index + 1}`,
        status: statuses[index % statuses.length],
        phone: `138****000${index + 1}`,
        email: `user${index + 1}@example.com`,
        points: 100 + index * 50,
        registerTime: '2024-01-15 09:30:00',
      }));
      
      setTableData(mockData);
      setPagination(prev => ({ ...prev, total: 5 }));
      setLoading(false);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchUserList();
  };

  const handleReset = () => {
    setSearchValue('');
    setStatusFilter('');
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchUserList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleViewDetail = (record) => {
    navigate(`/user/detail/${record.id}`);
  };

  const handleEdit = (record) => {
    navigate(`/user/edit/${record.id}`);
  };

  const handleDelete = (record) => {
    setConfirmDialog({
      visible: true,
      title: '确认删除',
      content: `确定要删除用户 "${record.nickname || record.name}" 吗？`,
      onConfirm: () => confirmDelete(record.id),
    });
  };

  const confirmDelete = async (id) => {
    setConfirmDialog(prev => ({ ...prev, loading: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTableData(prev => prev.filter(item => item.id !== id));
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
    } catch (error) {
      console.error('删除失败:', error);
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };



  const getStatusTag = (status) => {
    const statusMap = {
      active: { text: '正常', color: '#52c41a' },
      banned: { text: '禁用', color: '#ff4d4f' },
      pending: { text: '待审核', color: '#faad14' },
    };
    const statusInfo = statusMap[status] || { text: status, color: '#666' };
    return (
      <span style={{ color: statusInfo.color, fontWeight: 'bold' }}>
        {statusInfo.text}
      </span>
    );
  };

  const columns = [
    {
      colKey: 'id',
      title: 'ID',
      width: 80,
    },
    {
      colKey: 'nickname',
      title: '用户昵称',
      width: 150,
    },
    {
      colKey: 'username',
      title: '用户名',
      width: 120,
    },
    {
      colKey: 'phone',
      title: '手机号',
      width: 130,
    },
    {
      colKey: 'email',
      title: '邮箱',
      width: 180,
    },
    {
      colKey: 'status',
      title: '状态',
      width: 80,
      render: (value) => getStatusTag(value),
    },
    {
      colKey: 'points',
      title: '积分',
      width: 80,
    },
    {
      colKey: 'registerTime',
      title: '注册时间',
      width: 160,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 150,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleViewDetail(record)}
            style={{
              padding: '4px 8px',
              border: '1px solid #1890ff',
              backgroundColor: 'transparent',
              color: '#1890ff',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            查看
          </button>
          <button
            onClick={() => handleEdit(record)}
            style={{
              padding: '4px 8px',
              border: '1px solid #52c41a',
              backgroundColor: 'transparent',
              color: '#52c41a',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            编辑
          </button>
          <button
            onClick={() => handleDelete(record)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ff4d4f',
              backgroundColor: 'transparent',
              color: '#ff4d4f',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            删除
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* 搜索表单 */}
      <div style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>搜索关键词</label>
            <input
              type="text"
              placeholder="请输入用户名、昵称或邮箱"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>用户状态</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSearch}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              搜索
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <PageTable
          data={tableData}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>

      {/* 确认对话框 */}
      <ConfirmDialog
        visible={confirmDialog.visible}
        title={confirmDialog.title}
        content={confirmDialog.content}
        loading={confirmDialog.loading}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false })}
      />
    </div>
  );
};

export default UserList;