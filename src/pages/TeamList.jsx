import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Tag, Space } from '../components/ui';
import PageTable from '../components/PageTable';

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
        <Button
          variant="outline"
          size="small"
          onClick={() => handleViewDetail(row)}
        >
          👁️ 查看
        </Button>
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
    </div>
  );
};

export default TeamList;