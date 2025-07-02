import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Select, Avatar, MessagePlugin } from 'tdesign-react';
import { SearchIcon, ViewIcon, BanIcon, CheckCircleIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

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
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/users', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     status: statusFilter,
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const statuses = ['active', 'banned', 'pending'];
        const genders = ['male', 'female'];
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => {
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const gender = genders[Math.floor(Math.random() * genders.length)];
          
          return {
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            username: `user${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            nickname: `绿邻居${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
            phone: `138****${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
            email: `user${index + 1}@example.com`,
            gender: gender,
            age: Math.floor(Math.random() * 50) + 18,
            status: status,
            points: Math.floor(Math.random() * 5000) + 100,
            teamCount: Math.floor(Math.random() * 5),
            activityCount: Math.floor(Math.random() * 20),
            checkinDays: Math.floor(Math.random() * 365),
            carbonReduction: (Math.random() * 100).toFixed(2),
            registerTime: '2024-01-15 09:30:00',
            lastLoginTime: '2024-01-21 14:20:00',
          };
        });
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 1256 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      MessagePlugin.error('获取用户列表失败');
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

  const handleToggleStatus = (record, newStatus) => {
    const actionText = {
      active: '启用',
      banned: '禁用',
    }[newStatus];
    
    setConfirmDialog({
      visible: true,
      title: `确认${actionText}`,
      content: `确定要${actionText}用户「${record.nickname}」吗？`,
      onConfirm: () => performToggleStatus(record.id, newStatus),
      loading: false,
    });
  };

  const performToggleStatus = async (userId, newStatus) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.patch(`/api/users/${userId}/status`, { status: newStatus });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actionText = {
        active: '启用',
        banned: '禁用',
      }[newStatus];
      
      MessagePlugin.success(`${actionText}成功`);
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchUserList(); // 刷新列表
    } catch (error) {
      console.error('状态更新失败:', error);
      MessagePlugin.error('状态更新失败');
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

  const getGenderText = (gender) => {
    return gender === 'male' ? '男' : gender === 'female' ? '女' : '未知';
  };

  const columns = [
    {
      colKey: 'id',
      title: 'ID',
      width: 80,
    },
    {
      colKey: 'userInfo',
      title: '用户信息',
      width: 200,
      cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={row.avatar} size="small" />
          <div>
            <div style={{ fontWeight: 'bold' }}>{row.nickname}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>@{row.username}</div>
          </div>
        </div>
      ),
    },
    {
      colKey: 'contact',
      title: '联系方式',
      width: 180,
      cell: ({ row }) => (
        <div style={{ fontSize: '12px' }}>
          <div>{row.phone}</div>
          <div style={{ color: '#666' }}>{row.email}</div>
        </div>
      ),
    },
    {
      colKey: 'profile',
      title: '个人信息',
      width: 100,
      cell: ({ row }) => (
        <div style={{ fontSize: '12px' }}>
          <div>{getGenderText(row.gender)}</div>
          <div>{row.age}岁</div>
        </div>
      ),
    },
    {
      colKey: 'status',
      title: '状态',
      width: 80,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: 'stats',
      title: '活动数据',
      width: 120,
      cell: ({ row }) => (
        <div style={{ fontSize: '12px' }}>
          <div>积分: {row.points}</div>
          <div>队伍: {row.teamCount}</div>
          <div>活动: {row.activityCount}</div>
        </div>
      ),
    },
    {
      colKey: 'environmental',
      title: '环保数据',
      width: 120,
      cell: ({ row }) => (
        <div style={{ fontSize: '12px' }}>
          <div>打卡: {row.checkinDays}天</div>
          <div>减碳: {row.carbonReduction}kg</div>
        </div>
      ),
    },
    {
      colKey: 'registerTime',
      title: '注册时间',
      width: 160,
    },
    {
      colKey: 'lastLoginTime',
      title: '最后登录',
      width: 160,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 180,
      cell: ({ row }) => (
        <Space>
          <Button
            variant="text"
            size="small"
            icon={<ViewIcon />}
            onClick={() => handleViewDetail(row)}
          >
            详情
          </Button>
          {row.status === 'active' && (
            <Button
              variant="text"
              size="small"
              theme="danger"
              icon={<BanIcon />}
              onClick={() => handleToggleStatus(row, 'banned')}
            >
              禁用
            </Button>
          )}
          {row.status === 'banned' && (
            <Button
              variant="text"
              size="small"
              theme="success"
              icon={<CheckCircleIcon />}
              onClick={() => handleToggleStatus(row, 'active')}
            >
              启用
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space wrap>
            <Input
              placeholder="搜索用户名或昵称"
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
              icon={<SearchIcon />}
              onClick={handleSearch}
            >
              搜索
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

      <ConfirmDialog
        visible={confirmDialog.visible}
        title={confirmDialog.title}
        content={confirmDialog.content}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false })}
        loading={confirmDialog.loading}
      />
    </div>
  );
};

export default UserList;