import React, { useState, useEffect } from 'react';
import { Card, Form, Input, InputNumber, Switch, Button, Space, MessagePlugin, Textarea, Select, Upload, Divider } from 'tdesign-react';
import { SaveIcon, RefreshIcon, UploadIcon } from 'tdesign-icons-react';
// import axios from 'axios';

const SystemSettings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const pointsRuleOptions = [
    { label: '固定积分', value: 'fixed' },
    { label: '按时长计算', value: 'duration' },
    { label: '按距离计算', value: 'distance' },
    { label: '按减碳量计算', value: 'carbon' },
  ];

  const carbonCalculationOptions = [
    { label: '标准计算', value: 'standard' },
    { label: '精确计算', value: 'precise' },
    { label: '简化计算', value: 'simple' },
  ];

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  const fetchSystemSettings = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/system/settings');
      // form.setFieldsValue(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockSettings = {
          // 基础设置
          systemName: '绿邻居后台管理系统',
          systemDescription: '致力于推广绿色生活方式的社区平台',
          contactEmail: 'admin@greenneighbor.com',
          contactPhone: '400-123-4567',
          
          // 积分设置
          pointsEnabled: true,
          checkinPoints: 10,
          activityPoints: 50,
          invitePoints: 100,
          pointsRule: 'fixed',
          pointsExpireDays: 365,
          
          // 减碳设置
          carbonEnabled: true,
          carbonCalculation: 'standard',
          transportCarbonRate: 0.5,
          wasteCarbonRate: 0.3,
          energyCarbonRate: 0.8,
          waterCarbonRate: 0.2,
          
          // 审核设置
          autoApproveCheckin: false,
          autoApproveTeam: false,
          autoApproveActivity: false,
          reviewTimeLimit: 24,
          
          // 通知设置
          emailNotification: true,
          smsNotification: false,
          pushNotification: true,
          notificationTemplate: '您有新的消息，请及时查看。',
          
          // 安全设置
          passwordMinLength: 8,
          passwordComplexity: true,
          loginAttempts: 5,
          sessionTimeout: 30,
          
          // 文件设置
          maxFileSize: 10,
          allowedFileTypes: 'jpg,jpeg,png,gif,pdf,doc,docx',
          imageQuality: 80,
          
          // 其他设置
          maintenanceMode: false,
          debugMode: false,
          logLevel: 'info',
          cacheEnabled: true,
        };
        
        form.setFieldsValue(mockSettings);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取系统设置失败:', error);
      MessagePlugin.error('获取系统设置失败');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSaveLoading(true);
      
      // TODO: 替换为实际的API调用
      // await axios.put('/api/system/settings', values);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success('系统设置保存成功');
    } catch (error) {
      console.error('保存系统设置失败:', error);
      MessagePlugin.error('保存系统设置失败');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReset = () => {
    form.reset();
    fetchSystemSettings();
  };

  const handleLogoUpload = (files) => {
    // TODO: 实现logo上传
    console.log('上传logo:', files);
    MessagePlugin.success('Logo上传成功');
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Card title="系统设置">
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleSave}
        >
          {/* 基础设置 */}
          <Card title="基础设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="系统名称"
              name="systemName"
              rules={[{ required: true, message: '请输入系统名称' }]}
            >
              <Input placeholder="请输入系统名称" />
            </Form.FormItem>
            
            <Form.FormItem
              label="系统描述"
              name="systemDescription"
            >
              <Textarea
                placeholder="请输入系统描述"
                autosize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.FormItem>
            
            <Form.FormItem
              label="系统Logo"
              name="systemLogo"
            >
              <Upload
                action="/api/upload"
                accept="image/*"
                onChange={handleLogoUpload}
                theme="image"
                tips="支持jpg、png格式，建议尺寸200x60px"
              />
            </Form.FormItem>
            
            <Form.FormItem
              label="联系邮箱"
              name="contactEmail"
              rules={[
                { required: true, message: '请输入联系邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]}
            >
              <Input placeholder="请输入联系邮箱" />
            </Form.FormItem>
            
            <Form.FormItem
              label="联系电话"
              name="contactPhone"
            >
              <Input placeholder="请输入联系电话" />
            </Form.FormItem>
          </Card>

          {/* 积分设置 */}
          <Card title="积分设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="启用积分系统"
              name="pointsEnabled"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="签到积分"
              name="checkinPoints"
            >
              <InputNumber min={0} max={1000} placeholder="每次签到获得的积分" />
            </Form.FormItem>
            
            <Form.FormItem
              label="活动积分"
              name="activityPoints"
            >
              <InputNumber min={0} max={1000} placeholder="参与活动获得的积分" />
            </Form.FormItem>
            
            <Form.FormItem
              label="邀请积分"
              name="invitePoints"
            >
              <InputNumber min={0} max={1000} placeholder="邀请好友获得的积分" />
            </Form.FormItem>
            
            <Form.FormItem
              label="积分规则"
              name="pointsRule"
            >
              <Select options={pointsRuleOptions} placeholder="选择积分计算规则" />
            </Form.FormItem>
            
            <Form.FormItem
              label="积分有效期(天)"
              name="pointsExpireDays"
            >
              <InputNumber min={0} max={3650} placeholder="积分过期天数，0表示永不过期" />
            </Form.FormItem>
          </Card>

          {/* 减碳设置 */}
          <Card title="减碳设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="启用减碳系统"
              name="carbonEnabled"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="减碳计算方式"
              name="carbonCalculation"
            >
              <Select options={carbonCalculationOptions} placeholder="选择减碳计算方式" />
            </Form.FormItem>
            
            <Form.FormItem
              label="出行减碳系数"
              name="transportCarbonRate"
            >
              <InputNumber min={0} max={10} step={0.1} placeholder="每公里减碳量(kg)" />
            </Form.FormItem>
            
            <Form.FormItem
              label="垃圾分类减碳系数"
              name="wasteCarbonRate"
            >
              <InputNumber min={0} max={10} step={0.1} placeholder="每次分类减碳量(kg)" />
            </Form.FormItem>
            
            <Form.FormItem
              label="节能减碳系数"
              name="energyCarbonRate"
            >
              <InputNumber min={0} max={10} step={0.1} placeholder="每度电减碳量(kg)" />
            </Form.FormItem>
            
            <Form.FormItem
              label="节水减碳系数"
              name="waterCarbonRate"
            >
              <InputNumber min={0} max={10} step={0.1} placeholder="每升水减碳量(kg)" />
            </Form.FormItem>
          </Card>

          {/* 审核设置 */}
          <Card title="审核设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="自动审核打卡"
              name="autoApproveCheckin"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="自动审核队伍"
              name="autoApproveTeam"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="自动审核活动"
              name="autoApproveActivity"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="审核时限(小时)"
              name="reviewTimeLimit"
            >
              <InputNumber min={1} max={168} placeholder="超过时限自动通过" />
            </Form.FormItem>
          </Card>

          {/* 通知设置 */}
          <Card title="通知设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="邮件通知"
              name="emailNotification"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="短信通知"
              name="smsNotification"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="推送通知"
              name="pushNotification"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="通知模板"
              name="notificationTemplate"
            >
              <Textarea
                placeholder="请输入通知模板内容"
                autosize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.FormItem>
          </Card>

          {/* 安全设置 */}
          <Card title="安全设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="密码最小长度"
              name="passwordMinLength"
            >
              <InputNumber min={6} max={20} placeholder="密码最小长度" />
            </Form.FormItem>
            
            <Form.FormItem
              label="密码复杂度要求"
              name="passwordComplexity"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="登录尝试次数"
              name="loginAttempts"
            >
              <InputNumber min={3} max={10} placeholder="超过次数将锁定账户" />
            </Form.FormItem>
            
            <Form.FormItem
              label="会话超时(分钟)"
              name="sessionTimeout"
            >
              <InputNumber min={5} max={480} placeholder="会话超时时间" />
            </Form.FormItem>
          </Card>

          {/* 文件设置 */}
          <Card title="文件设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="最大文件大小(MB)"
              name="maxFileSize"
            >
              <InputNumber min={1} max={100} placeholder="单个文件最大大小" />
            </Form.FormItem>
            
            <Form.FormItem
              label="允许的文件类型"
              name="allowedFileTypes"
            >
              <Input placeholder="用逗号分隔，如：jpg,png,pdf" />
            </Form.FormItem>
            
            <Form.FormItem
              label="图片质量(%)"
              name="imageQuality"
            >
              <InputNumber min={10} max={100} placeholder="图片压缩质量" />
            </Form.FormItem>
          </Card>

          {/* 其他设置 */}
          <Card title="其他设置" style={{ marginBottom: '24px' }}>
            <Form.FormItem
              label="维护模式"
              name="maintenanceMode"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="调试模式"
              name="debugMode"
            >
              <Switch />
            </Form.FormItem>
            
            <Form.FormItem
              label="日志级别"
              name="logLevel"
            >
              <Select
                options={[
                  { label: 'Error', value: 'error' },
                  { label: 'Warn', value: 'warn' },
                  { label: 'Info', value: 'info' },
                  { label: 'Debug', value: 'debug' },
                ]}
                placeholder="选择日志级别"
              />
            </Form.FormItem>
            
            <Form.FormItem
              label="启用缓存"
              name="cacheEnabled"
            >
              <Switch />
            </Form.FormItem>
          </Card>

          <Divider />
          
          <Form.FormItem>
            <Space>
              <Button
                theme="primary"
                type="submit"
                loading={saveLoading}
                icon={<SaveIcon />}
              >
                保存设置
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                icon={<RefreshIcon />}
              >
                重置
              </Button>
            </Space>
          </Form.FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default SystemSettings;