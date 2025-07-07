import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Input, Tag, Space, Select } from '../components/ui';
import PageTable from '../components/PageTable';
import ConfirmDialog from '../components/ConfirmDialog';

const TeamList = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // 状态筛选
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
  });

  const fetchTeamList = useCallback(async () => {
    try {
      setLoading(true);
      // 模拟数据
      setTimeout(() => {
        let mockData = Array.from({ length: 50 }, (_, index) => ({
          id: index + 1,
          name: `绿色环保队${index + 1}`,
          leader: `队长${index + 1}`,
          memberCount: Math.floor(Math.random() * 50) + 10,
          status: Math.random() > 0.5 ? 'approved' : 'pending',
          createTime: '2024-01-15 10:30:00',
          description: '致力于环保事业，推广绿色生活理念',
        }));
        
        // 根据搜索条件筛选
        if (searchValue) {
          mockData = mockData.filter(item => 
            item.name.includes(searchValue) || item.leader.includes(searchValue)
          );
        }
        
        // 根据状态筛选
        if (statusFilter) {
          mockData = mockData.filter(item => item.status === statusFilter);
        }
        
        // 分页处理
        const total = mockData.length;
        const start = (pagination.current - 1) * pagination.pageSize;
        const end = start + pagination.pageSize;
        const pageData = mockData.slice(start, end);
        
        setTableData(pageData);
        setPagination(prev => ({ ...prev, total }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取队伍列表失败:', error);
      alert('获取队伍列表失败');
      setLoading(false);
    }
  }, [searchValue, statusFilter, pagination]);

  useEffect(() => {
    fetchTeamList();
  }, [fetchTeamList]);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchTeamList();
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };



  const handleApprove = (record) => {
    setConfirmDialog({
      visible: true,
      title: '审核确认',
      content: `确定要审核通过队伍「${record.name}」吗？`,
      onConfirm: () => confirmApprove(record),
    });
  };

  const confirmApprove = async (record) => {
    try {
      // 这里应该调用实际的审核API
      console.log('审核通过队伍:', record.id);
      alert('审核成功！');
      
      // 更新本地数据
      setTableData(prev => prev.map(item => 
        item.id === record.id ? { ...item, status: 'approved' } : item
      ));
      
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null });
    } catch (error) {
      console.error('审核失败:', error);
      alert('审核失败，请重试');
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      approved: { color: 'success', text: '已通过' },
      pending: { color: 'warning', text: '待审核' },
      rejected: { color: 'danger', text: '已拒绝' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const columns = [
    {
      colKey: 'id',
      title: 'ID',
      width: 80,
    },
    {
      colKey: 'name',
      title: '队伍名称',
      width: 200,
    },
    {
      colKey: 'leader',
      title: '队长',
      width: 120,
    },
    {
      colKey: 'memberCount',
      title: '成员数量',
      width: 100,
      cell: ({ row }) => `${row.memberCount}人`,
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
      colKey: 'description',
      title: '描述',
      width: 200,
      ellipsis: true,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 120,
      cell: ({ row }) => (
        <Space>
          {row.status === 'pending' ? (
            <Button
              theme="primary"
              size="small"
              onClick={() => handleApprove(row)}
            >
              审核
            </Button>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Input
              placeholder="搜索队伍名称或队长"
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: '300px' }}
            />
            <Select
              placeholder="选择状态"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              style={{ width: '150px' }}
              clearable
            >
              <Select.Option value="approved">已通过</Select.Option>
              <Select.Option value="pending">待审核</Select.Option>
              <Select.Option value="rejected">已拒绝</Select.Option>
            </Select>
            <Button
              theme="primary"
              onClick={handleSearch}
            >
              🔍 搜索
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
        onCancel={() => setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null })}
      />
    </div>
  );
};

export default TeamList;