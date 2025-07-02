import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Select, DatePicker, MessagePlugin, Avatar, Image } from 'tdesign-react';
import { SearchIcon, ViewIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const CheckinList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
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
    { label: '绿色出行', value: 'transport' },
    { label: '垃圾分类', value: 'waste' },
    { label: '节能减排', value: 'energy' },
    { label: '节约用水', value: 'water' },
    { label: '绿色消费', value: 'consumption' },
    { label: '其他', value: 'other' },
  ];

  const statusOptions = [
    { label: '全部状态', value: '' },
    { label: '待审核', value: 'pending' },
    { label: '已通过', value: 'approved' },
    { label: '已拒绝', value: 'rejected' },
  ];

  useEffect(() => {
    fetchCheckinList();
  }, [pagination.current, pagination.pageSize]);

  const fetchCheckinList = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/checkins', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     type: typeFilter,
      //     status: statusFilter,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const types = ['transport', 'waste', 'energy', 'water', 'consumption', 'other'];
        const statuses = ['pending', 'approved', 'rejected'];
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => {
          const type = types[Math.floor(Math.random() * types.length)];
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          
          return {
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            userId: Math.floor(Math.random() * 1000) + 1,
            username: `user${Math.floor(Math.random() * 1000) + 1}`,
            nickname: `绿邻居${Math.floor(Math.random() * 1000) + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
            type: type,
            title: getCheckinTitle(type),
            description: getCheckinDescription(type),
            images: [
              `https://picsum.photos/200/150?random=${index * 3 + 1}`,
              `https://picsum.photos/200/150?random=${index * 3 + 2}`,
            ],
            location: '北京市朝阳区绿色社区',
            coordinates: {
              latitude: 39.9042 + (Math.random() - 0.5) * 0.1,
              longitude: 116.4074 + (Math.random() - 0.5) * 0.1,
            },
            status: status,
            points: status === 'approved' ? Math.floor(Math.random() * 50) + 10 : 0,
            carbonReduction: status === 'approved' ? (Math.random() * 5).toFixed(2) : 0,
            checkinTime: '2024-01-21 08:30:00',
            reviewTime: status !== 'pending' ? '2024-01-21 10:15:00' : null,
            reviewer: status !== 'pending' ? '管理员' : null,
            rejectReason: status === 'rejected' ? '图片不清晰，无法确认打卡内容' : null,
          };
        });
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 3580 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取打卡记录失败:', error);
      MessagePlugin.error('获取打卡记录失败');
      setLoading(false);
    }
  };

  const getCheckinTitle = (type) => {
    const titles = {
      transport: '绿色出行打卡',
      waste: '垃圾分类打卡',
      energy: '节能减排打卡',
      water: '节约用水打卡',
      consumption: '绿色消费打卡',
      other: '环保行为打卡',
    };
    return titles[type] || '环保打卡';
  };

  const getCheckinDescription = (type) => {
    const descriptions = {
      transport: '今天选择公共交通出行，为环保贡献一份力量',
      waste: '认真进行垃圾分类，让资源得到合理利用',
      energy: '关闭不必要的电器设备，节约能源',
      water: '使用节水设备，珍惜每一滴水',
      consumption: '购买环保产品，支持绿色消费',
      other: '践行环保理念，从小事做起',
    };
    return descriptions[type] || '环保行为记录';
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchCheckinList();
  };

  const handleReset = () => {
    setSearchValue('');
    setTypeFilter('');
    setStatusFilter('');
    setDateRange([]);
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchCheckinList();
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
    navigate(`/checkin/detail/${record.id}`);
  };

  const handleReview = (record, status) => {
    const actionText = status === 'approved' ? '通过' : '拒绝';
    
    setConfirmDialog({
      visible: true,
      title: `确认${actionText}`,
      content: `确定要${actionText}这条打卡记录吗？`,
      onConfirm: () => performReview(record.id, status),
      loading: false,
    });
  };

  const performReview = async (checkinId, status) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.patch(`/api/checkins/${checkinId}/review`, {
      //   status: status,
      // });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actionText = status === 'approved' ? '通过' : '拒绝';
      MessagePlugin.success(`${actionText}成功`);
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchCheckinList(); // 刷新列表
    } catch (error) {
      console.error('审核失败:', error);
      MessagePlugin.error('审核失败');
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const getTypeTag = (type) => {
    const typeMap = {
      transport: { color: 'success', text: '绿色出行' },
      waste: { color: 'warning', text: '垃圾分类' },
      energy: { color: 'primary', text: '节能减排' },
      water: { color: 'cyan', text: '节约用水' },
      consumption: { color: 'purple', text: '绿色消费' },
      other: { color: 'default', text: '其他' },
    };
    const config = typeMap[type] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const getStatusTag = (status) => {
    const statusMap = {
      pending: { color: 'warning', text: '待审核' },
      approved: { color: 'success', text: '已通过' },
      rejected: { color: 'danger', text: '已拒绝' },
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
      colKey: 'userInfo',
      title: '用户信息',
      width: 150,
      cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={row.avatar} size="small" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{row.nickname}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>@{row.username}</div>
          </div>
        </div>
      ),
    },
    {
      colKey: 'type',
      title: '类型',
      width: 100,
      cell: ({ row }) => getTypeTag(row.type),
    },
    {
      colKey: 'content',
      title: '打卡内容',
      width: 200,
      cell: ({ row }) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>{row.title}</div>
          <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.4' }}>
            {row.description.length > 50 ? `${row.description.substring(0, 50)}...` : row.description}
          </div>
        </div>
      ),
    },
    {
      colKey: 'images',
      title: '打卡图片',
      width: 120,
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          {row.images.slice(0, 2).map((image, index) => (
            <Image
              key={index}
              src={image}
              width={40}
              height={30}
              fit="cover"
              style={{ borderRadius: '4px' }}
              fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNSAxMEgyNVYyMEgxNVYxMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+"
            />
          ))}
          {row.images.length > 2 && (
            <div style={{ 
              width: '40px', 
              height: '30px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: '#666'
            }}>
              +{row.images.length - 2}
            </div>
          )}
        </div>
      ),
    },
    {
      colKey: 'location',
      title: '位置',
      width: 150,
      ellipsis: true,
    },
    {
      colKey: 'status',
      title: '状态',
      width: 80,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: 'rewards',
      title: '奖励',
      width: 100,
      cell: ({ row }) => (
        row.status === 'approved' ? (
          <div style={{ fontSize: '12px' }}>
            <div>积分: {row.points}</div>
            <div>减碳: {row.carbonReduction}kg</div>
          </div>
        ) : '-'
      ),
    },
    {
      colKey: 'checkinTime',
      title: '打卡时间',
      width: 140,
    },
    {
      colKey: 'reviewInfo',
      title: '审核信息',
      width: 140,
      cell: ({ row }) => (
        row.reviewTime ? (
          <div style={{ fontSize: '12px' }}>
            <div>{row.reviewTime}</div>
            <div style={{ color: '#666' }}>{row.reviewer}</div>
          </div>
        ) : '-'
      ),
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 150,
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
          {row.status === 'pending' && (
            <>
              <Button
                variant="text"
                size="small"
                theme="success"
                icon={<CheckCircleIcon />}
                onClick={() => handleReview(row, 'approved')}
              >
                通过
              </Button>
              <Button
                variant="text"
                size="small"
                theme="danger"
                icon={<CloseCircleIcon />}
                onClick={() => handleReview(row, 'rejected')}
              >
                拒绝
              </Button>
            </>
          )}
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
              style={{ width: '120px' }}
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

export default CheckinList;