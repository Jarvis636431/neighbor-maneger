import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Button, Space, Descriptions, Avatar, MessagePlugin } from 'tdesign-react';
import { ArrowLeftIcon, UserIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: '',
    content: '',
    onConfirm: null,
    loading: false,
  });

  useEffect(() => {
    fetchTeamDetail();
  }, [id]);

  const fetchTeamDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/teams/${id}`);
      // setTeamData(response.data);
      
      // 模拟数据
      setTimeout(() => {
        setTeamData({
          id: id,
          name: `绿色环保队${id}`,
          leader: {
            name: '张三',
            phone: '138****1234',
            avatar: '',
          },
          status: Math.random() > 0.5 ? 'approved' : 'pending',
          memberCount: 25,
          maxMembers: 50,
          createTime: '2024-01-15 10:30:00',
          description: '我们是一支致力于环保事业的队伍，希望通过实际行动推广绿色生活理念，保护我们的地球家园。我们定期组织各种环保活动，包括垃圾分类宣传、植树造林、节能减排等。',
          reason: '希望能够参与到环保活动中，为社区环保事业贡献力量，让更多人了解环保的重要性。',
          activities: [
            { name: '社区垃圾分类宣传', date: '2024-01-20', participants: 15 },
            { name: '公园植树活动', date: '2024-01-25', participants: 20 },
          ],
          members: [
            { id: 1, name: '张三', role: '队长', joinTime: '2024-01-15' },
            { id: 2, name: '李四', role: '副队长', joinTime: '2024-01-16' },
            { id: 3, name: '王五', role: '成员', joinTime: '2024-01-17' },
            { id: 4, name: '赵六', role: '成员', joinTime: '2024-01-18' },
          ],
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取队伍详情失败:', error);
      MessagePlugin.error('获取队伍详情失败');
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      approved: { color: 'success', text: '已通过' },
      pending: { color: 'warning', text: '待审核' },
      rejected: { color: 'error', text: '已拒绝' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const handleApprove = () => {
    setConfirmDialog({
      visible: true,
      title: '确认通过',
      content: `确定要通过队伍「${teamData.name}」的申请吗？`,
      onConfirm: () => performAudit('approve'),
      loading: false,
    });
  };

  const handleReject = () => {
    setConfirmDialog({
      visible: true,
      title: '确认拒绝',
      content: `确定要拒绝队伍「${teamData.name}」的申请吗？`,
      onConfirm: () => performAudit('reject'),
      loading: false,
    });
  };

  const performAudit = async (action) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.post(`/api/teams/${id}/audit`, { action });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success(action === 'approve' ? '审核通过成功' : '审核拒绝成功');
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      
      // 更新本地状态
      setTeamData(prev => ({
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

  if (!teamData) {
    return <div>队伍不存在</div>;
  }

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
          <Card title="队伍基本信息">
            <Descriptions>
              <Descriptions.DescriptionsItem label="队伍名称">
                {teamData.name}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="状态">
                {getStatusTag(teamData.status)}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="队长">
                <Space>
                  <Avatar size="small" icon={<UserIcon />} />
                  {teamData.leader.name}
                </Space>
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="联系电话">
                {teamData.leader.phone}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="成员数量">
                {teamData.memberCount} / {teamData.maxMembers}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="创建时间">
                {teamData.createTime}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="队伍描述" span={2}>
                {teamData.description}
              </Descriptions.DescriptionsItem>
              <Descriptions.DescriptionsItem label="申请理由" span={2}>
                {teamData.reason}
              </Descriptions.DescriptionsItem>
            </Descriptions>
          </Card>

          <Card title="队伍成员" style={{ marginTop: '16px' }}>
            <div>
              {teamData.members.map(member => (
                <div key={member.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '12px 0',
                  borderBottom: '1px solid var(--td-border-level-1-color)'
                }}>
                  <Avatar size="small" icon={<UserIcon />} style={{ marginRight: '12px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{member.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                      {member.role} · 加入时间：{member.joinTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col span={8}>
          {teamData.status === 'pending' && (
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

          <Card title="活动记录">
            <div>
              {teamData.activities.length > 0 ? (
                teamData.activities.map((activity, index) => (
                  <div key={index} style={{ 
                    marginBottom: '12px',
                    padding: '12px',
                    backgroundColor: 'var(--td-bg-color-container-hover)',
                    borderRadius: '6px'
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      {activity.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                      时间：{activity.date}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                      参与人数：{activity.participants}人
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--td-text-color-secondary)' }}>
                  暂无活动记录
                </div>
              )}
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

export default TeamDetail;