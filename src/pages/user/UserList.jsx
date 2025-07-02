import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

// 模拟 UI 组件
const Card = ({ children, ...props }) => (
  <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} {...props}>
    {children}
  </div>
);

const Tag = ({ theme, children, ...props }) => {
  const colors = {
    success: { bg: '#f6ffed', color: '#52c41a', border: '#b7eb8f' },
    danger: { bg: '#fff2f0', color: '#ff4d4f', border: '#ffccc7' },
    warning: { bg: '#fffbe6', color: '#faad14', border: '#ffe58f' },
    default: { bg: '#fafafa', color: '#666', border: '#d9d9d9' }
  };
  const style = colors[theme] || colors.default;
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      backgroundColor: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`
    }} {...props}>
      {children}
    </span>
  );
};

const Avatar = ({ src, size, ...props }) => (
  <img 
    src={src} 
    alt="avatar" 
    style={{ 
      width: size === 'small' ? '32px' : '40px', 
      height: size === 'small' ? '32px' : '40px', 
      borderRadius: '50%',
      objectFit: 'cover'
    }} 
    {...props} 
  />
);

const Button = ({ children, variant, size, theme, icon, onClick, ...props }) => {
  const baseStyle = {
    padding: size === 'small' ? '4px 8px' : '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: size === 'small' ? '12px' : '14px'
  };
  
  let themeStyle = {};
  if (theme === 'primary') {
    themeStyle = { backgroundColor: '#1890ff', color: '#fff' };
  } else if (theme === 'danger') {
    themeStyle = { backgroundColor: variant === 'text' ? 'transparent' : '#ff4d4f', color: variant === 'text' ? '#ff4d4f' : '#fff' };
  } else if (theme === 'success') {
    themeStyle = { backgroundColor: variant === 'text' ? 'transparent' : '#52c41a', color: variant === 'text' ? '#52c41a' : '#fff' };
  } else if (variant === 'outline') {
    themeStyle = { backgroundColor: 'transparent', color: '#666', border: '1px solid #d9d9d9' };
  } else if (variant === 'text') {
    themeStyle = { backgroundColor: 'transparent', color: '#1890ff' };
  } else {
    themeStyle = { backgroundColor: '#f5f5f5', color: '#333' };
  }
  
  return (
    <button style={{ ...baseStyle, ...themeStyle }} onClick={onClick} {...props}>
      {icon}
      {children}
    </button>
  );
};

const Space = ({ children, wrap, ...props }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: wrap ? 'wrap' : 'nowrap' }} {...props}>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, style, ...props }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      fontSize: '14px',
      ...style
    }}
    {...props}
  />
);

const Select = ({ placeholder, value, onChange, options, style, ...props }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#fff',
      ...style
    }}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options?.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

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
      alert('获取用户列表失败');
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
      
      alert(`${actionText}成功`);
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchUserList(); // 刷新列表
    } catch (error) {
      console.error('状态更新失败:', error);
      alert('状态更新失败');
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
            />
            <Select
              placeholder="选择状态"
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              style={{ width: '120px' }}
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
          onPaginationChange={handlePageChange}
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