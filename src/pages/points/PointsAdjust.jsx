import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Textarea, Button, Space, MessagePlugin, Select, Avatar } from 'tdesign-react';
import { ArrowLeftIcon, SearchIcon } from 'tdesign-icons-react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const PointsAdjust = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustType, setAdjustType] = useState('add');
  const [points, setPoints] = useState(0);
  const [reason, setReason] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  // 模拟用户数据
  const mockUsers = [
    { id: 1, username: 'user001', nickname: '环保达人', avatar: '', currentPoints: 1250 },
    { id: 2, username: 'user002', nickname: '绿色生活', avatar: '', currentPoints: 980 },
    { id: 3, username: 'user003', nickname: '低碳先锋', avatar: '', currentPoints: 1580 },
    { id: 4, username: 'user004', nickname: '节能小能手', avatar: '', currentPoints: 750 },
    { id: 5, username: 'user005', nickname: '减排专家', avatar: '', currentPoints: 2100 },
  ];

  // 计算最终积分
  const calculateFinalPoints = () => {
    const values = form.getFieldsValue();
    if (!selectedUser || !values.adjustType || !values.points) return selectedUser?.points || 0;
    
    const currentPoints = selectedUser.points;
    switch (values.adjustType) {
      case 'add':
        return currentPoints + values.points;
      case 'subtract':
        return Math.max(0, currentPoints - values.points);
      case 'set':
        return values.points;
      default:
        return currentPoints;
    }
  };

  const adjustTypeOptions = [
    { label: '增加积分', value: 'add' },
    { label: '扣除积分', value: 'subtract' },
    { label: '设置积分', value: 'set' },
  ];

  const handleUserSearch = async (value) => {
    if (!value || value.length < 2) {
      setUserOptions([]);
      return;
    }

    try {
      setSearchLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/users/search', {
      //   params: { keyword: value, limit: 10 }
      // });
      // setUserOptions(response.data.map(user => ({
      //   label: `${user.nickname} (@${user.username})`,
      //   value: user.id,
      //   user: user,
      // })));
      
      // 模拟数据
      setTimeout(() => {
        const searchMockUsers = Array.from({ length: 5 }, () => {
          const userId = Math.floor(Math.random() * 1000) + 1;
          return {
            id: userId,
            username: `user${userId}`,
            nickname: `绿邻居${userId}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
            points: Math.floor(Math.random() * 5000) + 100,
            phone: `138****${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          };
        });
        
        setUserOptions(searchMockUsers.map(user => ({
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar src={user.avatar} size="small" />
              <div>
                <div>{user.nickname}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>@{user.username} | 当前积分: {user.points}</div>
              </div>
            </div>
          ),
          value: user.id,
          user: user,
        })));
        setSearchLoading(false);
      }, 500);
    } catch (error) {
      console.error('搜索用户失败:', error);
      MessagePlugin.error('搜索用户失败');
      setSearchLoading(false);
    }
  };

  const handleUserSelect = (value, option) => {
    setSelectedUser(option.user);
    form.setFieldsValue({ userId: value });
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // 计算最终积分
      let finalPoints;
      const currentPoints = selectedUser?.points || 0;
      
      switch (values.adjustType) {
        case 'add':
          finalPoints = currentPoints + values.points;
          break;
        case 'subtract':
          finalPoints = Math.max(0, currentPoints - values.points);
          break;
        case 'set':
          finalPoints = values.points;
          break;
        default:
          finalPoints = currentPoints;
      }
      
      // TODO: 替换为实际的API调用
      // await axios.post('/api/points/adjust', {
      //   userId: values.userId,
      //   adjustType: values.adjustType,
      //   points: values.points,
      //   remark: values.remark,
      // });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success('积分调整成功');
      navigate('/points/list');
    } catch (error) {
      console.error('积分调整失败:', error);
      MessagePlugin.error('积分调整失败');
    } finally {
      setLoading(false);
    }
  };

  const getPointsPreview = () => {
    const values = form.getFieldsValue();
    if (!selectedUser || !values.adjustType || !values.points) {
      return null;
    }
    
    const currentPoints = selectedUser.points;
    let finalPoints;
    let changeText;
    
    switch (values.adjustType) {
      case 'add':
        finalPoints = currentPoints + values.points;
        changeText = `+${values.points}`;
        break;
      case 'subtract':
        finalPoints = Math.max(0, currentPoints - values.points);
        changeText = `-${values.points}`;
        break;
      case 'set':
        finalPoints = values.points;
        changeText = `设置为${values.points}`;
        break;
      default:
        return null;
    }
    
    return (
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '6px',
        border: '1px solid #e7e7e7'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>积分变更预览</div>
        <div style={{ fontSize: '14px' }}>
          <div>当前积分: <span style={{ fontWeight: 'bold' }}>{currentPoints}</span></div>
          <div>变更: <span style={{ color: values.adjustType === 'add' ? '#52c41a' : '#ff4d4f', fontWeight: 'bold' }}>{changeText}</span></div>
          <div>变更后: <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{finalPoints}</span></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="outline"
          icon={<ArrowLeftIcon />}
          onClick={() => navigate('/points/list')}
        >
          返回列表
        </Button>
      </div>

      <Card title="手动调整积分">
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleSubmit}
          style={{ maxWidth: '600px' }}
        >
          <Form.FormItem
            label="选择用户"
            name="userId"
            rules={[
              { required: true, message: '请选择要调整积分的用户' },
            ]}
          >
            <Select
              placeholder="输入用户名或昵称搜索"
              options={userOptions}
              onSearch={handleUserSearch}
              onSelect={handleUserSelect}
              loading={searchLoading}
              filterable
              remote
              reserveKeyword
              style={{ width: '100%' }}
            />
          </Form.FormItem>

          {selectedUser && (
            <div style={{ 
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              border: '1px solid #bae7ff'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>选中用户信息</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar src={selectedUser.avatar} size="medium" />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{selectedUser.nickname}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>@{selectedUser.username}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>当前积分: {selectedUser.points}</div>
                </div>
              </div>
            </div>
          )}

          <Form.FormItem
            label="调整类型"
            name="adjustType"
            rules={[
              { required: true, message: '请选择调整类型' },
            ]}
          >
            <Select
              placeholder="请选择调整类型"
              options={adjustTypeOptions}
              style={{ width: '100%' }}
            />
          </Form.FormItem>

          <Form.FormItem
            label="积分数量"
            name="points"
            rules={[
              { required: true, message: '请输入积分数量' },
              { type: 'number', min: 1, message: '积分数量必须大于0' },
            ]}
          >
            <InputNumber
              placeholder="请输入积分数量"
              min={1}
              max={999999}
              style={{ width: '100%' }}
            />
          </Form.FormItem>

          {getPointsPreview()}

          <Form.FormItem
            label="调整原因"
            name="remark"
            rules={[
              { required: true, message: '请输入调整原因' },
              { max: 200, message: '调整原因不能超过200个字符' },
            ]}
          >
            <Textarea
              placeholder="请详细说明积分调整的原因，此信息将记录在积分变更日志中"
              maxlength={200}
              showLimitNumber
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.FormItem>

          <Form.FormItem>
            <Space>
              <Button
                theme="primary"
                type="submit"
                loading={loading}
              >
                确认调整
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/points/list')}
              >
                取消
              </Button>
            </Space>
          </Form.FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default PointsAdjust;