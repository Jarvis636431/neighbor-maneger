import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Button, Space, Descriptions, Avatar, Progress, MessagePlugin } from 'tdesign-react';
import { ArrowLeftIcon, UserIcon, CheckCircleIcon, CloseCircleIcon, LocationIcon, TimeIcon } from 'tdesign-icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: '',
    content: '',
    onConfirm: null,
    loading: false,
  });

  useEffect(() => {
    fetchActivityDetail();
  }, [id]);

  const fetchActivityDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/activities/${id}`);
      // setActivityData(response.data);
      
      // 模拟数据
      setTimeout(() => {
        setActivityData({
          id: id,
          title: `环保活动${id}`,
          organizer: {
            name: '绿色环保队',
            contact: '138****1234',
            leader: '张三',
          },
          status: Math.random() > 0.5 ? 'approved' : 'pending',
          startTime: '2024-01-25 09:00:00',
          endTime: '2024-01-25 17:00:00',
          location: '市中心公园',
          address: '某市某区某街道123号',
          maxParticipants: 100,
          currentParticipants: 67,
          createTime: '2024-01-20 10:30:00',
          description: '这是一个关于环保的活动，旨在提高大家的环保意识，通过实际行动保护环境。我们将组织垃圾清理、植树造林等活动，让参与者在实践中学习环保知识。',
          purpose: '希望通过此次活动让更多人了解环保的重要性，共同为地球环境贡献力量。',
          requirements: '请参与者自备垃圾袋、手套等工具，穿着适合户外活动的服装。',
          schedule: [
            { time: '09:00-09:30', content: '签到集合' },
            { time: '09:30-10:00', content: '活动介绍和安全须知' },
            { time: '10:00-12:00', content: '垃圾清理活动' },
            { time: '12:00-13:00', content: '午餐休息' },
            { time: '13:00-16:00', content: '植树造林活动' },
            { time: '16:00-17:00', content: '活动总结和合影' },
          ],
          participants: [
            { id: 1, name: '李四', team: '绿色环保队', signInTime: '2024-01-25 08:55:00' },
            { id: 2, name: '王五', team: '环保先锋队', signInTime: '2024-01-25 09:02:00' },
            { id: 3, name: '赵六', team: '绿色环保队', signInTime: null },
            { id: 4, name: '钱七', team: '生态保护队', signInTime: '2024-01-25 09:10:00' },
          ],
          signInStats: {
            total: 67,
            signedIn: 45,
            notSignedIn: 22,
          },
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取活动详情失败:', error);
      MessagePlugin.error('获取活动详情失败');
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      approved: { color: 'success', text: '已通过' },
      pending: { color: 'warning', text: '待审核' },
      rejected: { color: 'error', text: '已拒绝' },
      ongoing: { color: 'processing', text: '进行中' },
      finished: { color: 'default', text: '已结束' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const handleApprove = () => {
    setConfirmDialog({
      visible: true,
      title: '确认通过',
      content: `确定要通过活动「${activityData.title}」的申请吗？`,
      onConfirm: () => performAudit('approve'),
      loading: false,
    });
  };

  const handleReject = () => {
    setConfirmDialog({
      visible: true,
      title: '确认拒绝',
      content: `确定要拒绝活动「${activityData.title}」的申请吗？`,
      onConfirm: () => performAudit('reject'),
      loading: false,
    });
  };

  const performAudit = async (action) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.post(`/api/activities/${id}/audit`, { action });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success(action === 'approve' ? '审核通过成功' : '审核拒绝成功');
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      
      // 更新本地状态
      setActivityData(prev => ({
        ...prev,
        status: action === 'approve' ? 'approved' : 'rejected'
      }));
    } catch (error) {
      console.error('审核操作失败:', error);
      MessagePlugin.error('审核操作失败');
      setConfirmDialog(prev => ({ ...prev, loading: false }));
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!activityData) {
    return <div>活动不存在</div>;
  }

  const participationRate = (activityData.currentParticipants / activityData.maxParticipants * 100).toFixed(1);
  const signInRate = (activityData.signInStats.signedIn / activityData.signInStats.total * 100).toFixed(1);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="text"
          icon={<ArrowLeftIcon />}
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="活动基本信息">
            <Descriptions>
              <Descriptions.DescriptionsItem label="活动标题">
                {activityData.title}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="状态">
                {getStatusTag(activityData.status)}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="主办方">
                {activityData.organizer.name}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="负责人">
                {activityData.organizer.leader}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="联系方式">
                {activityData.organizer.contact}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="活动时间">
                <Space direction="vertical" size="small">
                  <div><TimeIcon size="14px" /> 开始：{activityData.startTime}</div>
                  <div><TimeIcon size="14px" /> 结束：{activityData.endTime}</div>
                </Space>
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="活动地点">
                <Space direction="vertical" size="small">
                  <div><LocationIcon size="14px" /> {activityData.location}</div>
                  <div style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                    {activityData.address}
                  </div>
                </Space>
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="报名情况">
                <div>
                  <div style={{ marginBottom: '8px' }}>
                    {activityData.currentParticipants} / {activityData.maxParticipants} 人
                  </div>
                  <Progress percentage={participationRate} size="small" />
                </div>
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="创建时间">
                {activityData.createTime}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="活动描述" span={2}>
                {activityData.description}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="活动目的" span={2}>
                {activityData.purpose}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="参与要求" span={2}>
                {activityData.requirements}
              </Descriptions.DescriptionsItem>
            </Descriptions>
          </Card>

          <Card title="活动安排" style={{ marginTop: '16px' }}>
            <div>
              {activityData.schedule.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  padding: '12px 0',
                  borderBottom: index < activityData.schedule.length - 1 ? '1px solid var(--td-border-level-1-color)' : 'none'
                }}>
                  <div style={{ 
                    width: '120px', 
                    fontWeight: 'bold',
                    color: 'var(--td-brand-color)'
                  }}>
                    {item.time}
                  </div>
                  <div style={{ flex: 1 }}>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col span={8}>
          {activityData.status === 'pending' && (
            <Card title="审核操作" style={{ marginBottom: '16px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  theme="success"
                  block
                  icon={<CheckCircleIcon />}
                  onClick={handleApprove}
                >
                  通过申请
                </Button>
                <Button
                  theme="danger"
                  block
                  icon={<CloseCircleIcon />}
                  onClick={handleReject}
                >
                  拒绝申请
                </Button>
              </Space>
            </Card>
          )}

          <Card title="签到统计" style={{ marginBottom: '16px' }}>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>签到率</span>
                  <span>{signInRate}%</span>
                </div>
                <Progress percentage={signInRate} size="small" />
              </div>
              
              <div style={{ fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>总报名人数</span>
                  <span>{activityData.signInStats.total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>已签到</span>
                  <span style={{ color: 'var(--td-success-color)' }}>{activityData.signInStats.signedIn}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>未签到</span>
                  <span style={{ color: 'var(--td-warning-color)' }}>{activityData.signInStats.notSignedIn}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="参与者列表">
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {activityData.participants.map(participant => (
                <div key={participant.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '8px 0',
                  borderBottom: '1px solid var(--td-border-level-1-color)'
                }}>
                  <Avatar size="small" icon={<UserIcon />} style={{ marginRight: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{participant.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                      {participant.team}
                    </div>
                  </div>
                  <div>
                    {participant.signInTime ? (
                      <Tag theme="success" size="small">已签到</Tag>
                    ) : (
                      <Tag theme="warning" size="small">未签到</Tag>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

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

export default ActivityDetail;