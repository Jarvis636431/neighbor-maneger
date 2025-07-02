import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Tag, MessagePlugin } from 'tdesign-react';
import { CheckCircleIcon, CloseCircleIcon, ViewIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const TeamAudit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    fetchPendingTeams();
  }, [pagination.current, pagination.pageSize]);

  const fetchPendingTeams = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/teams/pending', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const mockData = Array.from({ length: Math.min(pagination.pageSize, 8) }, (_, index) => ({
          id: (pagination.current - 1) * pagination.pageSize + index + 1,
          name: `待审核队伍${(pagination.current - 1) * pagination.pageSize + index + 1}`,
          leader: `申请人${index + 1}`,
          leaderPhone: `138****${String(1000 + index).slice(-4)}`,
          memberCount: Math.floor(Math.random() * 20) + 5,
          status: 'pending',
          createTime: '2024-01-15 10:30:00',
          description: '我们是一支致力于环保事业的队伍，希望通过实际行动推广绿色生活理念，保护我们的地球家园。',
          reason: '希望能够参与到环保活动中，为社区环保事业贡献力量。',
        }));
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 23 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取待审核队伍失败:', error);
      MessagePlugin.error('获取待审核队伍失败');
      setLoading(false);
    }
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleApprove = (record) => {
    setConfirmDialog({
      visible: true,
      title: '确认通过',
      content: `确定要通过队伍「${record.name}」的申请吗？`,
      onConfirm: () => performAudit(record.id, 'approve'),
      loading: false,
    });
  };

  const handleReject = (record) => {
    setConfirmDialog({
      visible: true,
      title: '确认拒绝',
      content: `确定要拒绝队伍「${record.name}」的申请吗？`,
      onConfirm: () => performAudit(record.id, 'reject'),
      loading: false,
    });
  };

  const performAudit = async (teamId, action) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.post(`/api/teams/${teamId}/audit`, { action });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success(action === 'approve' ? '审核通过成功' : '审核拒绝成功');
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchPendingTeams(); // 刷新列表
    } catch (error) {
      console.error('审核操作失败:', error);
      MessagePlugin.error('审核操作失败');
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const handleViewDetail = (record) => {
    navigate(`/team/detail/${record.id}`);
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
      width: 180,
    },
    {
      colKey: 'leader',
      title: '队长',
      width: 100,
    },
    {
      colKey: 'leaderPhone',
      title: '联系电话',
      width: 120,
    },
    {
      colKey: 'memberCount',
      title: '预计成员',
      width: 100,
      cell: ({ row }) => `${row.memberCount}人`,
    },
    {
      colKey: 'createTime',
      title: '申请时间',
      width: 160,
    },
    {
      colKey: 'reason',
      title: '申请理由',
      ellipsis: true,
      width: 200,
    },
    {
      colKey: 'operation',
      title: '操作',
      width: 200,
      cell: ({ row }) => (
        <Space>
          <Button
            variant="text"
            size="small"
            icon={<ViewIcon />}
            onClick={() => handleViewDetail(row)}
          >
            查看详情
          </Button>
          <Button
            theme="success"
            size="small"
            icon={<CheckCircleIcon />}
            onClick={() => handleApprove(row)}
          >
            通过
          </Button>
          <Button
            theme="danger"
            size="small"
            icon={<CloseCircleIcon />}
            onClick={() => handleReject(row)}
          >
            拒绝
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <h3>待审核队伍列表</h3>
          <p style={{ color: 'var(--td-text-color-secondary)', margin: '8px 0 0 0' }}>
            共有 {pagination.total} 个队伍等待审核
          </p>
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

export default TeamAudit;