import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Tag, MessagePlugin } from 'tdesign-react';
import { CheckCircleIcon, CloseCircleIcon, ViewIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const ActivityAudit = () => {
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
    fetchPendingActivities();
  }, [pagination.current, pagination.pageSize]);

  const fetchPendingActivities = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/activities/pending', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const mockData = Array.from({ length: Math.min(pagination.pageSize, 6) }, (_, index) => ({
          id: (pagination.current - 1) * pagination.pageSize + index + 1,
          title: `待审核活动${(pagination.current - 1) * pagination.pageSize + index + 1}`,
          organizer: `绿色环保队${index + 1}`,
          organizerContact: `138****${String(1000 + index).slice(-4)}`,
          startTime: '2024-01-25 09:00:00',
          endTime: '2024-01-25 17:00:00',
          location: `活动地点${index + 1}`,
          maxParticipants: Math.floor(Math.random() * 100) + 50,
          status: 'pending',
          createTime: '2024-01-20 10:30:00',
          description: '这是一个关于环保的活动，旨在提高大家的环保意识，通过实际行动保护环境。',
          purpose: '希望通过此次活动让更多人了解环保的重要性，共同为地球环境贡献力量。',
        }));
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 18 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取待审核活动失败:', error);
      MessagePlugin.error('获取待审核活动失败');
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
      content: `确定要通过活动「${record.title}」的申请吗？`,
      onConfirm: () => performAudit(record.id, 'approve'),
      loading: false,
    });
  };

  const handleReject = (record) => {
    setConfirmDialog({
      visible: true,
      title: '确认拒绝',
      content: `确定要拒绝活动「${record.title}」的申请吗？`,
      onConfirm: () => performAudit(record.id, 'reject'),
      loading: false,
    });
  };

  const performAudit = async (activityId, action) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.post(`/api/activities/${activityId}/audit`, { action });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success(action === 'approve' ? '审核通过成功' : '审核拒绝成功');
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      fetchPendingActivities(); // 刷新列表
    } catch (error) {
      console.error('审核操作失败:', error);
      MessagePlugin.error('审核操作失败');
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const handleViewDetail = (record) => {
    navigate(`/activity/detail/${record.id}`);
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
      width: 180,
    },
    {
      colKey: 'organizer',
      title: '主办方',
      width: 120,
    },
    {
      colKey: 'organizerContact',
      title: '联系方式',
      width: 120,
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
      colKey: 'maxParticipants',
      title: '最大人数',
      width: 100,
      cell: ({ row }) => `${row.maxParticipants}人`,
    },
    {
      colKey: 'createTime',
      title: '申请时间',
      width: 160,
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
          <h3>待审核活动列表</h3>
          <p style={{ color: 'var(--td-text-color-secondary)', margin: '8px 0 0 0' }}>
            共有 {pagination.total} 个活动等待审核
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

export default ActivityAudit;