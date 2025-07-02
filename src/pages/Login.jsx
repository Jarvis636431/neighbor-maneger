import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input } from '../components/ui';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 测试账号
  const testAccount = {
    username: 'admin',
    password: '123456'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // 清除错误信息
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('请输入用户名和密码');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 验证测试账号
      if (formData.username === testAccount.username && formData.password === testAccount.password) {
        // 登录成功，保存登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', formData.username);
        
        // 跳转到首页
        navigate('/');
      } else {
        setError('用户名或密码错误');
      }
    } catch {
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <Card style={{
        padding: '32px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '28px', 
            color: '#262626',
            fontWeight: '600'
          }}>
            邻里管理系统
          </h1>
          <p style={{ 
            margin: 0, 
            color: '#8c8c8c', 
            fontSize: '14px' 
          }}>
            请登录您的账户
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="text"
              placeholder="用户名"
              value={formData.username}
              onChange={(value) => handleInputChange('username', value)}
              size="large"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="password"
              placeholder="密码"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              size="large"
            />
          </div>

          {error && (
            <div style={{
              marginBottom: '20px',
              padding: '8px 12px',
              backgroundColor: '#fff2f0',
              border: '1px solid #ffccc7',
              borderRadius: '6px',
              color: '#ff4d4f',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            theme="primary"
            loading={loading}
            style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
          >
            登录
          </Button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f6ffed',
          border: '1px solid #b7eb8f',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#52c41a'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>测试账号：</div>
          <div>用户名：admin</div>
          <div>密码：123456</div>
        </div>
      </Card>
    </div>
  );
};

export default Login;