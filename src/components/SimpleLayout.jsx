import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const SimpleLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/team/list', label: '队伍管理', icon: '👥' },
    { path: '/activity/list', label: '活动管理', icon: '🎯' },
    { path: '/user/list', label: '用户管理', icon: '👤' },
    { path: '/news/list', label: '资讯管理', icon: '📰' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 侧边栏 */}
      <div style={{
        width: collapsed ? '60px' : '240px',
        backgroundColor: '#001529',
        color: 'white',
        transition: 'width 0.2s',
        overflow: 'hidden'
      }}>
        {/* 头部 */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ margin: 0, color: 'white', fontSize: collapsed ? '0' : '16px' }}>
            {!collapsed && '绿邻居管理系统'}
          </h3>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        
        {/* 菜单 */}
        <div style={{ padding: '8px 0' }}>
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: location.pathname === item.path ? '#1890ff' : 'transparent',
                color: 'white',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
      
      {/* 主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 顶部导航 */}
        <div style={{
          height: '64px',
          backgroundColor: 'white',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <h2 style={{ margin: 0, color: '#333' }}>绿邻居后台管理系统</h2>
          <button style={{
            background: 'none',
            border: '1px solid #d9d9d9',
            padding: '4px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            退出登录
          </button>
        </div>
        
        {/* 内容区域 */}
        <div style={{
          flex: 1,
          padding: '24px',
          backgroundColor: '#f5f5f5',
          overflow: 'auto'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SimpleLayout;