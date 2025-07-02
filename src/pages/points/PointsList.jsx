import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Select, DatePicker, MessagePlugin, Avatar } from 'tdesign-react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const PointsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateRange, setDateRange] = useState([]);
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

  const typeOptions = [
    { label: '全部类型', value: '' },
    { label: '签到奖励', value: 'checkin' },
    { label: '活动参与', value: 'activity' },
    { label: '任务完成', value: 'task' },
    { label: '邀请奖励', value: 'invite' },
    { label: '管理员调整', value: 'admin' },
    { label: '积分兑换', value: 'exchange' },
  ];

  useEffect(() => {
    fetchPointsList();
  }, [pagination.current, pagination.pageSize]);

  const fetchPointsList = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/points', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     type: typeFilter,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const types = ['checkin', 'activity', 'task', 'invite', 'admin', 'exchange'];
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => {
          const type = types[Math.floor(Math.random() * types.length)];
          const isPositive = type !== 'exchange';
          const points = isPositive 
            ? Math.floor(Math.random() * 100) + 10
            : -(Math.floor(Math.random() * 50) + 10);
          
          return {
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            userId: Math.floor(Math.random() * 1000) + 1,
            username: `user${Math.floor(Math.random() * 1000) + 1}`,
            nickname: `绿邻居${Math.floor(Math.random() * 1000) + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
            type: type,
            points: points,
            description: getPointsDescription(type),
            relatedId: type === 'activity' ? Math.floor(Math.random() * 100) + 1 : null,
            relatedTitle: type === 'activity' ? `环保活动${Math.floor(Math.random() * 100) + 1}` : null,
            beforePoints: Math.floor(Math.random() * 2000) + 500,
            afterPoints: 0, // 将在下面计算
            operator: type === 'admin' ? '管理员' : '系统',
            createTime: '2024-01-21 14:30:00',
            remark: type === 'admin' ? '手动调整用户积分' : '',
          };
        });
        
        // 计算变更后积分
        mockData.forEach(item => {
          item.afterPoints = item.beforePoints + item.points;
        });
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 2580 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取积分记录失败:', error);
      MessagePlugin.error('获取积分记录失败');
      setLoading(false);
    }
  };

  const getPointsDescription = (type) => {
    const descriptions = {
      checkin: '每日签到奖励',
      activity: '参与环保活动',
      task: '完成环保任务',
      invite: '邀请好友注册',
      admin: '管理员手动调整',
      exchange: '积分商城兑换',
    };
    return descriptions[type] || '其他';
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchPointsList();
  };

  const handleReset = () => {
    setSearchValue('');
    setTypeFilter('');
    setDateRange([]);
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchPointsList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleManualAdjust = () => {
    navigate('/points/adjust');
  };



  const handleDelete = () => {
    setConfirmDialog({
      visible: true,
      title: '确认删除',
      content: `确定要删除这条积分记录吗？删除后无法恢复。`,
      onConfirm: () => performDelete(),
      loading: false,
    });
  };

  const performDelete = async () => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.delete(`/api/points/${recordId}`);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success('删除成功');
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchPointsList(); // 刷新列表
    } catch (error) {
      console.error('删除失败:', error);
      MessagePlugin.error('删除失败');
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const getTypeTag = (type) => {
    const typeMap = {
      checkin: { color: 'success', text: '签到奖励' },
      activity: { color: 'primary', text: '活动参与' },
      task: { color: 'warning', text: '任务完成' },
      invite: { color: 'purple', text: '邀请奖励' },
      admin: { color: 'cyan', text: '管理员调整' },
      exchange: { color: 'danger', text: '积分兑换' },
    };
    const config = typeMap[type] || { color: 'default', text: '其他' };
    return <Tag theme={config.color}>{config.text}</Tag>;
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
      width: 180,
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
      colKey: 'type',
      title: '类型',
      width: 120,
      cell: ({ row }) => getTypeTag(row.type),
    },
    {
      colKey: 'points',
      title: '积分变动',
      width: 100,
      cell: ({ row }) => {
        const color = row.points > 0 ? '#52c41a' : '#ff4d4f';
        const prefix = row.points > 0 ? '+' : '';
        return (
          <span style={{ color, fontWeight: 'bold' }}>
            {prefix}{row.points}
          </span>
        );
      },
    },
    {
      colKey: 'balance',
      title: '积分余额',
      width: 120,
      cell: ({ row }) => (
        <div style={{ fontSize: '12px' }}>
          <div>变更前: {row.beforePoints}</div>
          <div>变更后: {row.afterPoints}</div>
        </div>
      ),
    },
    {
      colKey: 'description',
      title: '描述',
      width: 150,
    },
    {
      colKey: 'relatedInfo',
      title: '关联信息',
      width: 150,
      cell: ({ row }) => (
        row.relatedTitle ? (
          <div style={{ fontSize: '12px' }}>
            <div>{row.relatedTitle}</div>
            <div style={{ color: '#666' }}>ID: {row.relatedId}</div>
          </div>
        ) : '-'
      ),
    },
    {
      colKey: 'operator',
      title: '操作者',
      width: 100,
    },
    {
      colKey: 'createTime',
      title: '创建时间',
      width: 160,
    },
    {
      colKey: 'remark',
      title: '备注',
      width: 150,
      ellipsis: true,
      cell: ({ row }) => row.remark || '-',
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 100,
      cell: ({ row }) => (
        <Space>
          {row.type === 'admin' && (
            <Button
              variant="text"
              size="small"
              theme="danger"
              icon={<DeleteIcon />}
              onClick={handleDelete}
            >
              删除
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
              style={{ width: '200px' }}
              clearable
            />
            <Select
              placeholder="选择类型"
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeOptions}
              style={{ width: '140px' }}
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
          
          <Button
            theme="primary"
            icon={<AddIcon />}
            onClick={handleManualAdjust}
          >
            手动调整积分
          </Button>
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

export default PointsList;