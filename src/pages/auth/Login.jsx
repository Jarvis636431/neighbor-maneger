import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 模拟组件
const Card = ({ children }) => (
  <div style={{
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '400px'
  }}>{children}</div>
);

const Input = ({ type = 'text', placeholder, value, onChange, style }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
      fontSize: '14px',
      boxSizing: 'border-box',
      ...style
    }}
  />
);

const Button = ({ children, type = 'button', onClick, loading, style }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={loading}
    style={{
      width: '100%',
      padding: '12px 16px',
      backgroundColor: loading ? '#91d5ff' : '#1890ff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s',
      ...style
    }}
  >
    {loading ? '登录中...' : children}
  </button>
);

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
    } catch (err) {
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
      <Card>
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
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <Input
              type="password"
              placeholder="密码"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
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

          <Button type="submit" loading={loading}>
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