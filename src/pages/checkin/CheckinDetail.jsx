import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Avatar, Tag, Button, Space, MessagePlugin, Image, Textarea } from 'tdesign-react';
import { ArrowLeftIcon, CheckIcon, CloseIcon, LocationIcon, TimeIcon, PhoneIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const CheckinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checkinInfo, setCheckinInfo] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectDialogVisible, setRejectDialogVisible] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: '',
    content: '',
    onConfirm: null,
    loading: false,
  });

  useEffect(() => {
    if (id) {
      fetchCheckinDetail();
    }
  }, [id]);

  const fetchCheckinDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/checkins/${id}`);
      // setCheckinInfo(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockCheckin = {
          id: parseInt(id),
          userId: 123,
          username: 'user123',
          nickname: '绿邻居123',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
          phone: '138****1234',
          type: 'transport',
          title: '绿色出行打卡',
          description: '今天选择地铁出行，从家到公司全程使用公共交通，为减少碳排放贡献一份力量。地铁不仅环保，还能避免交通拥堵，是很好的出行选择。',
          images: [
            `https://picsum.photos/400/300?random=1`,
            `https://picsum.photos/400/300?random=2`,
            `https://picsum.photos/400/300?random=3`,
          ],
          location: '北京市朝阳区国贸地铁站',
          coordinates: {
            latitude: 39.9042,
            longitude: 116.4074,
          },
          address: '北京市朝阳区建国门外大街1号',
          status: 'pending',
          points: 0,
          carbonReduction: 0,
          checkinTime: '2024-01-21 08:30:00',
          reviewTime: null,
          reviewer: null,
          rejectReason: null,
          weather: '晴天',
          temperature: '15°C',
          deviceInfo: {
            platform: 'iOS',
            version: '17.2',
            model: 'iPhone 14',
          },
          userStats: {
            totalCheckins: 128,
            consecutiveDays: 15,
            totalPoints: 2580,
            totalCarbonReduction: 85.6,
          },
        };
        
        setCheckinInfo(mockCheckin);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取打卡详情失败:', error);
      MessagePlugin.error('获取打卡详情失败');
      setLoading(false);
    }
  };

  const handleApprove = () => {
    setConfirmDialog({
      visible: true,
      title: '确认通过',
      content: '确定要通过这条打卡记录吗？通过后将给用户发放相应的积分和减碳量奖励。',
      onConfirm: () => performReview('approved'),
      loading: false,
    });
  };

  const handleReject = () => {
    setRejectDialogVisible(true);
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      MessagePlugin.error('请输入拒绝原因');
      return;
    }
    
    setRejectDialogVisible(false);
    setConfirmDialog({
      visible: true,
      title: '确认拒绝',
      content: `确定要拒绝这条打卡记录吗？拒绝原因：${rejectReason}`,
      onConfirm: () => performReview('rejected', rejectReason),
      loading: false,
    });
  };

  const performReview = async (status, reason = '') => {
    try {
      setConfirmDialog(prev => ({ ...prev, loading: true }));
      
      // TODO: 替换为实际的API调用
      // await axios.patch(`/api/checkins/${id}/review`, {
      //   status: status,
      //   rejectReason: reason,
      // });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const actionText = status === 'approved' ? '通过' : '拒绝';
      MessagePlugin.success(`${actionText}成功`);
      setConfirmDialog({ visible: false, title: '', content: '', onConfirm: null, loading: false });
      
      // 更新打卡状态
      setCheckinInfo(prev => ({
        ...prev,
        status: status,
        reviewTime: '2024-01-21 10:15:00',
        reviewer: '管理员',
        rejectReason: reason,
        points: status === 'approved' ? 20 : 0,
        carbonReduction: status === 'approved' ? 2.5 : 0,
      }));
      
      setRejectReason('');
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

  if (loading || !checkinInfo) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="outline"
          icon={<ArrowLeftIcon />}
          onClick={() => navigate('/checkin/list')}
        >
          返回列表
        </Button>
      </div>

      {/* 打卡基本信息 */}
      <Card title="打卡详情" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <Descriptions
              layout="horizontal"
              column={1}
              items={[
                {
                  label: '用户信息',
                  content: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar src={checkinInfo.avatar} size="medium" />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{checkinInfo.nickname}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>@{checkinInfo.username}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{checkinInfo.phone}</div>
                      </div>
                    </div>
                  ),
                },
                { label: '打卡类型', content: getTypeTag(checkinInfo.type) },
                { label: '打卡标题', content: checkinInfo.title },
                { label: '打卡描述', content: checkinInfo.description },
                {
                  label: '打卡位置',
                  content: (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <LocationIcon size="14px" />
                        <span>{checkinInfo.location}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {checkinInfo.address}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        经纬度: {checkinInfo.coordinates.latitude}, {checkinInfo.coordinates.longitude}
                      </div>
                    </div>
                  ),
                },
                { label: '打卡时间', content: checkinInfo.checkinTime },
                {
                  label: '环境信息',
                  content: `${checkinInfo.weather} | ${checkinInfo.temperature}`,
                },
                { label: '审核状态', content: getStatusTag(checkinInfo.status) },
              ]}
            />
          </div>
          
          <div style={{ width: '200px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>用户统计</div>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <div>总打卡: {checkinInfo.userStats.totalCheckins}次</div>
                <div>连续打卡: {checkinInfo.userStats.consecutiveDays}天</div>
                <div>总积分: {checkinInfo.userStats.totalPoints}分</div>
                <div>总减碳: {checkinInfo.userStats.totalCarbonReduction}kg</div>
              </div>
            </div>
            
            {checkinInfo.status === 'pending' && (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  theme="success"
                  block
                  icon={<CheckCircleIcon />}
                  onClick={handleApprove}
                >
                  通过审核
                </Button>
                <Button
                  theme="danger"
                  variant="outline"
                  block
                  icon={<CloseCircleIcon />}
                  onClick={handleReject}
                >
                  拒绝审核
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Card>

      {/* 打卡图片 */}
      <Card title="打卡图片" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {checkinInfo.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={200}
              height={150}
              fit="cover"
              style={{ borderRadius: '8px' }}
              fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWOTBIODBWNjBaIiBmaWxsPSIjREREREREIi8+Cjwvc3ZnPg=="
            />
          ))}
        </div>
      </Card>

      {/* 审核信息 */}
      {checkinInfo.status !== 'pending' && (
        <Card title="审核信息">
          <Descriptions
            layout="horizontal"
            column={2}
            items={[
              { label: '审核状态', content: getStatusTag(checkinInfo.status) },
              { label: '审核时间', content: checkinInfo.reviewTime },
              { label: '审核人员', content: checkinInfo.reviewer },
              {
                label: '奖励积分',
                content: checkinInfo.points > 0 ? `+${checkinInfo.points}分` : '-',
              },
              {
                label: '减碳量',
                content: checkinInfo.carbonReduction > 0 ? `${checkinInfo.carbonReduction}kg` : '-',
              },
              {
                label: '拒绝原因',
                content: checkinInfo.rejectReason || '-',
              },
            ]}
          />
        </Card>
      )}

      {/* 设备信息 */}
      <Card title="设备信息" style={{ marginTop: '16px' }}>
        <Descriptions
          layout="horizontal"
          column={3}
          items={[
            { label: '设备平台', content: checkinInfo.deviceInfo.platform },
            { label: '系统版本', content: checkinInfo.deviceInfo.version },
            { label: '设备型号', content: checkinInfo.deviceInfo.model },
          ]}
        />
      </Card>

      {/* 拒绝原因输入对话框 */}
      <ConfirmDialog
        visible={rejectDialogVisible}
        title="拒绝审核"
        content={
          <div>
            <div style={{ marginBottom: '12px' }}>请输入拒绝原因：</div>
            <Textarea
              placeholder="请详细说明拒绝的原因，此信息将发送给用户"
              value={rejectReason}
              onChange={setRejectReason}
              maxlength={200}
              showLimitNumber
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
        }
        confirmText="确认拒绝"
        onConfirm={handleRejectConfirm}
        onCancel={() => {
          setRejectDialogVisible(false);
          setRejectReason('');
        }}
      />

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

export default CheckinDetail;