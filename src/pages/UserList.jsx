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
      active: { color: 'success', text: '正常' },
      banned: { color: 'danger', text: '禁用' },
      pending: { color: 'warning', text: '待审核' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
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
        <Space>
          <Button
            variant="text"
            size="small"
            onClick={() => handleViewDetail(record)}
          >
            👁️ 查看
          </Button>
          <Button
            variant="text"
            size="small"
            theme="success"
            onClick={() => handleEdit(record)}
          >
            ✏️ 编辑
          </Button>
          <Button
            variant="text"
            size="small"
            theme="danger"
            onClick={() => handleDelete(record)}
          >
            🗑️ 删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space wrap>
            <Input
              placeholder="请输入用户名、昵称或邮箱"
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: '250px' }}
              clearable
            />
            <Select
              placeholder="选择状态"
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              style={{ width: '120px' }}
              clearable
            />
            <Button
              theme="primary"
              onClick={handleSearch}
            >
              🔍 搜索
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              重置
            </Button>
          </Space>
        </div>
        
        <PageTable
          data={tableData}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>

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