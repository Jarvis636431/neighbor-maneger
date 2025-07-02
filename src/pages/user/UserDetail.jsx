import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Avatar, Tag, Button, Space, MessagePlugin, Row, Col, Progress, Statistic } from 'tdesign-react';
import { BanIcon, CheckCircleIcon, ArrowLeftIcon } from 'tdesign-icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
import PageTable from '../../components/PageTable';
// import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [checkinList, setCheckinList] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: '',
    content: '',
    onConfirm: null,
    loading: false,
  });

  useEffect(() => {
    if (id) {
      fetchUserDetail();
      fetchUserTeams();
      fetchUserActivities();
      fetchUserCheckins();
    }
  }, [id]);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/users/${id}`);
      // setUserInfo(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockUser = {
          id: parseInt(id),
          username: `user${id}`,
          nickname: `绿邻居${id}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
          phone: '138****1234',
          email: `user${id}@example.com`,
          gender: 'male',
          age: 28,
          status: 'active',
          points: 2580,
          level: 5,
          teamCount: 3,
          activityCount: 15,
          checkinDays: 128,
          carbonReduction: 85.6,
          address: '北京市朝阳区绿色社区',
          bio: '热爱环保，致力于绿色生活方式的推广者',
          registerTime: '2023-06-15 09:30:00',
          lastLoginTime: '2024-01-21 14:20:00',
          achievements: [
            { name: '环保达人', icon: '🌱', description: '连续打卡30天' },
            { name: '队伍领袖', icon: '👑', description: '成功组建3个队伍' },
            { name: '活动积极分子', icon: '🏃', description: '参与活动超过10次' },
          ],
        };
        
        setUserInfo(mockUser);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取用户详情失败:', error);
      MessagePlugin.error('获取用户详情失败');
      setLoading(false);
    }
  };

  const fetchUserTeams = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/users/${id}/teams`);
      // setTeamList(response.data);
      
      // 模拟数据
      const mockTeams = [
        {
          id: 1,
          name: '绿色出行小队',
          role: 'leader',
          memberCount: 12,
          status: 'active',
          joinTime: '2023-08-15 10:00:00',
        },
        {
          id: 2,
          name: '垃圾分类志愿者',
          role: 'member',
          memberCount: 25,
          status: 'active',
          joinTime: '2023-09-20 14:30:00',
        },
        {
          id: 3,
          name: '节能减排行动组',
          role: 'member',
          memberCount: 8,
          status: 'active',
          joinTime: '2023-11-10 16:45:00',
        },
      ];
      
      setTeamList(mockTeams);
    } catch (error) {
      console.error('获取用户队伍失败:', error);
    }
  };

  const fetchUserActivities = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/users/${id}/activities`);
      // setActivityList(response.data);
      
      // 模拟数据
      const mockActivities = [
        {
          id: 1,
          title: '社区垃圾分类宣传',
          type: 'volunteer',
          status: 'completed',
          points: 50,
          participateTime: '2024-01-20 09:00:00',
        },
        {
          id: 2,
          title: '绿色出行挑战赛',
          type: 'challenge',
          status: 'completed',
          points: 80,
          participateTime: '2024-01-18 14:00:00',
        },
        {
          id: 3,
          title: '环保知识竞赛',
          type: 'competition',
          status: 'ongoing',
          points: 0,
          participateTime: '2024-01-21 10:00:00',
        },
      ];
      
      setActivityList(mockActivities);
    } catch (error) {
      console.error('获取用户活动失败:', error);
    }
  };

  const fetchUserCheckins = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/users/${id}/checkins`);
      // setCheckinList(response.data);
      
      // 模拟数据
      const mockCheckins = [
        {
          id: 1,
          date: '2024-01-21',
          type: 'transport',
          description: '公共交通出行',
          points: 10,
          carbonReduction: 2.5,
        },
        {
          id: 2,
          date: '2024-01-20',
          type: 'waste',
          description: '垃圾分类',
          points: 5,
          carbonReduction: 1.2,
        },
        {
          id: 3,
          date: '2024-01-19',
          type: 'energy',
          description: '节约用电',
          points: 8,
          carbonReduction: 1.8,
        },
      ];
      
      setCheckinList(mockCheckins);
    } catch (error) {
      console.error('获取用户打卡记录失败:', error);
    }
  };

  const handleToggleStatus = (newStatus) => {
    const actionText = {
      active: '启用',
      banned: '禁用',
    }[newStatus];
    
    setConfirmDialog({
      visible: true,
      title: `确认${actionText}`,
      content: `确定要${actionText}用户「${userInfo?.nickname}」吗？`,
      onConfirm: () => performToggleStatus(newStatus),
      loading: false,
    });
  };

  const performToggleStatus = async (newStatus) => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.patch(`/api/users/${id}/status`, { status: newStatus });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actionText = {
        active: '启用',
        banned: '禁用',
      }[newStatus];
      
      MessagePlugin.success(`${actionText}成功`);
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      
      // 更新用户状态
      setUserInfo(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('状态更新失败:', error);
      MessagePlugin.error('状态更新失败');
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

  const getRoleTag = (role) => {
    const roleMap = {
      leader: { color: 'warning', text: '队长' },
      member: { color: 'primary', text: '成员' },
    };
    const config = roleMap[role] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const getActivityTypeTag = (type) => {
    const typeMap = {
      volunteer: { color: 'success', text: '志愿活动' },
      challenge: { color: 'warning', text: '挑战赛' },
      competition: { color: 'primary', text: '竞赛' },
    };
    const config = typeMap[type] || { color: 'default', text: '其他' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const getActivityStatusTag = (status) => {
    const statusMap = {
      completed: { color: 'success', text: '已完成' },
      ongoing: { color: 'warning', text: '进行中' },
      cancelled: { color: 'danger', text: '已取消' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const getCheckinTypeText = (type) => {
    const typeMap = {
      transport: '绿色出行',
      waste: '垃圾分类',
      energy: '节能减排',
      water: '节约用水',
    };
    return typeMap[type] || '其他';
  };

  const teamColumns = [
    {
      colKey: 'name',
      title: '队伍名称',
      width: 200,
    },
    {
      colKey: 'role',
      title: '角色',
      width: 100,
      cell: ({ row }) => getRoleTag(row.role),
    },
    {
      colKey: 'memberCount',
      title: '成员数量',
      width: 100,
    },
    {
      colKey: 'status',
      title: '状态',
      width: 100,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: 'joinTime',
      title: '加入时间',
      width: 160,
    },
  ];

  const activityColumns = [
    {
      colKey: 'title',
      title: '活动名称',
      width: 200,
    },
    {
      colKey: 'type',
      title: '类型',
      width: 100,
      cell: ({ row }) => getActivityTypeTag(row.type),
    },
    {
      colKey: 'status',
      title: '状态',
      width: 100,
      cell: ({ row }) => getActivityStatusTag(row.status),
    },
    {
      colKey: 'points',
      title: '获得积分',
      width: 100,
    },
    {
      colKey: 'participateTime',
      title: '参与时间',
      width: 160,
    },
  ];

  const checkinColumns = [
    {
      colKey: 'date',
      title: '日期',
      width: 120,
    },
    {
      colKey: 'type',
      title: '类型',
      width: 120,
      cell: ({ row }) => getCheckinTypeText(row.type),
    },
    {
      colKey: 'description',
      title: '描述',
      width: 200,
    },
    {
      colKey: 'points',
      title: '积分',
      width: 80,
    },
    {
      colKey: 'carbonReduction',
      title: '减碳量(kg)',
      width: 120,
    },
  ];

  if (loading || !userInfo) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="outline"
          icon={<ArrowLeftIcon />}
          onClick={() => navigate('/user/list')}
        >
          返回列表
        </Button>
      </div>

      {/* 用户基本信息 */}
      <Card title="用户基本信息" style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div style={{ textAlign: 'center' }}>
              <Avatar src={userInfo.avatar} size="large" style={{ marginBottom: '8px' }} />
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{userInfo.nickname}</div>
              <div style={{ color: '#666', fontSize: '12px' }}>@{userInfo.username}</div>
              <div style={{ marginTop: '8px' }}>
                {getStatusTag(userInfo.status)}
              </div>
              <div style={{ marginTop: '16px' }}>
                <Space>
                  {userInfo.status === 'active' && (
                    <Button
                      theme="danger"
                      variant="outline"
                      size="small"
                      icon={<BanIcon />}
                      onClick={() => handleToggleStatus('banned')}
                    >
                      禁用用户
                    </Button>
                  )}
                  {userInfo.status === 'banned' && (
                    <Button
                      theme="success"
                      variant="outline"
                      size="small"
                      icon={<CheckCircleIcon />}
                      onClick={() => handleToggleStatus('active')}
                    >
                      启用用户
                    </Button>
                  )}
                </Space>
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Descriptions
              layout="horizontal"
              column={2}
              items={[
                { label: '手机号码', content: userInfo.phone },
                { label: '邮箱地址', content: userInfo.email },
                { label: '性别', content: userInfo.gender === 'male' ? '男' : '女' },
                { label: '年龄', content: `${userInfo.age}岁` },
                { label: '地址', content: userInfo.address },
                { label: '个人简介', content: userInfo.bio },
                { label: '注册时间', content: userInfo.registerTime },
                { label: '最后登录', content: userInfo.lastLoginTime },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* 数据统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Card>
            <Statistic title="当前积分" value={userInfo.points} suffix="分" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="用户等级" value={userInfo.level} suffix="级" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="打卡天数" value={userInfo.checkinDays} suffix="天" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="减碳量" value={userInfo.carbonReduction} suffix="kg" />
          </Card>
        </Col>
      </Row>

      {/* 成就徽章 */}
      <Card title="成就徽章" style={{ marginBottom: '16px' }}>
        <Space wrap>
          {userInfo.achievements.map((achievement, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                border: '1px solid #e7e7e7',
                borderRadius: '6px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <span style={{ fontSize: '20px' }}>{achievement.icon}</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>{achievement.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{achievement.description}</div>
              </div>
            </div>
          ))}
        </Space>
      </Card>

      {/* 队伍信息 */}
      <Card title="参与队伍" style={{ marginBottom: '16px' }}>
        <PageTable
          data={teamList}
          columns={teamColumns}
          pagination={false}
        />
      </Card>

      {/* 活动记录 */}
      <Card title="活动记录" style={{ marginBottom: '16px' }}>
        <PageTable
          data={activityList}
          columns={activityColumns}
          pagination={false}
        />
      </Card>

      {/* 打卡记录 */}
      <Card title="最近打卡记录">
        <PageTable
          data={checkinList}
          columns={checkinColumns}
          pagination={false}
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

export default UserDetail;