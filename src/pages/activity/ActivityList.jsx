import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
// import axios from 'axios';

// 模拟组件
const Card = ({ children }) => (
  <div style={{
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e8e8e8'
  }}>{children}</div>
);

const Tag = ({ theme, children }) => (
  <span style={{
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    backgroundColor: theme === 'success' ? '#e6f7ff' : theme === 'error' ? '#fff2f0' : '#f5f5f5',
    color: theme === 'success' ? '#1890ff' : theme === 'error' ? '#ff4d4f' : '#666',
    border: `1px solid ${theme === 'success' ? '#91d5ff' : theme === 'error' ? '#ffccc7' : '#d9d9d9'}`
  }}>{children}</span>
);

const Button = ({ children, theme, variant, size, icon, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: size === 'small' ? '4px 8px' : '8px 16px',
      backgroundColor: theme === 'primary' ? '#1890ff' : variant === 'outline' ? '#fff' : 'transparent',
      color: theme === 'primary' ? '#fff' : variant === 'outline' ? '#1890ff' : '#1890ff',
      border: variant === 'outline' ? '1px solid #1890ff' : theme === 'primary' ? 'none' : 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: size === 'small' ? '12px' : '14px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      ...style
    }}
  >
    {icon}{children}
  </button>
);

const Space = ({ children, wrap }) => (
  <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    flexWrap: wrap ? 'wrap' : 'nowrap'
  }}>{children}</div>
);

const Input = ({ placeholder, value, onChange, style }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      fontSize: '14px',
      ...style
    }}
  />
);

const Select = ({ placeholder, value, onChange, options, style }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#fff',
      ...style
    }}
  >
    <option value="">{placeholder}</option>
    {options?.map(option => (
      <option key={option.value} value={option.value}>{option.label}</option>
    ))}
  </select>
);

const DatePicker = ({ placeholder, value, onChange, style }) => (
  <div style={{ display: 'flex', gap: '8px', ...style }}>
    <input
      type="date"
      placeholder={placeholder?.[0] || '开始日期'}
      value={value?.[0] || ''}
      onChange={(e) => onChange([e.target.value, value?.[1] || ''])}
      style={{
        padding: '8px 12px',
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        fontSize: '14px'
      }}
    />
    <input
      type="date"
      placeholder={placeholder?.[1] || '结束日期'}
      value={value?.[1] || ''}
      onChange={(e) => onChange([value?.[0] || '', e.target.value])}
      style={{
        padding: '8px 12px',
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        fontSize: '14px'
      }}
    />
  </div>
);

const SearchIcon = () => <span>🔍</span>;
const ViewIcon = () => <span>👁️</span>;

const ActivityList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const statusOptions = [
    { label: '全部状态', value: '' },
    { label: '进行中', value: 'ongoing' },
    { label: '已结束', value: 'finished' },
    { label: '已取消', value: 'cancelled' },
  ];

  useEffect(() => {
    fetchActivityList();
  }, [pagination.current, pagination.pageSize]);

  const fetchActivityList = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/activities', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     status: statusFilter,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => {
          const statuses = ['ongoing', 'finished', 'cancelled'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            title: `环保活动${(pagination.current - 1) * pagination.pageSize + index + 1}`,
            organizer: `绿色环保队${index + 1}`,
            startTime: '2024-01-20 09:00:00',
            endTime: '2024-01-20 17:00:00',
            location: `活动地点${index + 1}`,
            maxParticipants: Math.floor(Math.random() * 100) + 50,
            currentParticipants: Math.floor(Math.random() * 80) + 20,
            status: status,
            createTime: '2024-01-15 10:30:00',
            description: '这是一个关于环保的活动，旨在提高大家的环保意识。',
          };
        });
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 234 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取活动列表失败:', error);
      alert('获取活动列表失败');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchActivityList();
  };

  const handleReset = () => {
    setSearchValue('');
    setStatusFilter('');
    setDateRange([]);
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchActivityList();
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
    navigate(`/activity/detail/${record.id}`);
  };

  const getStatusTag = (status) => {
    const statusMap = {
      ongoing: { color: 'success', text: '进行中' },
      finished: { color: 'default', text: '已结束' },
      cancelled: { color: 'error', text: '已取消' },
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
      colKey: 'title',
      title: '活动标题',
      width: 200,
    },
    {
      colKey: 'organizer',
      title: '主办方',
      width: 150,
    },
    {
      colKey: 'startTime',
      title: '开始时间',
      width: 160,
    },
    {
      colKey: 'location',
      title: '活动地点',
      width: 120,
    },
    {
      colKey: 'participants',
      title: '报名情况',
      width: 120,
      cell: ({ row }) => `${row.currentParticipants}/${row.maxParticipants}`,
    },
    {
      colKey: 'status',
      title: '状态',
      width: 100,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: 'createTime',
      title: '创建时间',
      width: 160,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 120,
      cell: ({ row }) => (
        <Space>
          <Button
            variant="text"
            size="small"
            icon={<ViewIcon />}
            onClick={() => handleViewDetail(row)}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space wrap>
            <Input
              placeholder="搜索活动标题或主办方"
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
            <DatePicker
              mode="date"
              range
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '280px' }}
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
          onPaginationChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default ActivityList;