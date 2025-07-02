import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout as TLayout,
  Menu,
  Header,
  Aside,
  Content,
  Button,
} from 'tdesign-react';
import {
  DashboardIcon,
  UserGroupIcon,
  CalendarIcon,
  ArticleIcon,
  UserIcon,
  StarIcon,
  CheckCircleIcon,
  EcoIcon,
  SettingIcon,
  ChartIcon,
  MenuFoldIcon,
  MenuUnfoldIcon,
} from 'tdesign-icons-react';

const { HeadMenu } = Menu;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      value: '/',
      label: '首页',
      icon: <DashboardIcon />,
    },
    {
      value: 'team',
      label: '队伍管理',
      icon: <UserGroupIcon />,
      children: [
        {
          value: '/team/list',
          label: '队伍列表',
        },
        {
          value: '/team/audit',
          label: '队伍审核',
        },
      ],
    },
    {
      value: 'activity',
      label: '活动管理',
      icon: <CalendarIcon />,
      children: [
        {
          value: '/activity/list',
          label: '活动列表',
        },
        {
          value: '/activity/audit',
          label: '活动审核',
        },
      ],
    },
    {
      value: 'news',
      label: '资讯管理',
      icon: <ArticleIcon />,
      children: [
        {
          value: '/news/list',
          label: '资讯列表',
        },
        {
          value: '/news/edit',
          label: '发布资讯',
        },
      ],
    },
    {
      value: 'user',
      label: '用户管理',
      icon: <UserIcon />,
      children: [
        {
          value: '/user/list',
          label: '用户列表',
        },
      ],
    },
    {
      value: 'points',
      label: '积分管理',
      icon: <StarIcon />,
      children: [
        {
          value: '/points/list',
          label: '积分记录',
        },
        {
          value: '/points/adjust',
          label: '积分调整',
        },
      ],
    },
    {
      value: 'checkin',
      label: '打卡管理',
      icon: <CheckCircleIcon />,
      children: [
        {
          value: '/checkin/list',
          label: '打卡记录',
        },
      ],
    },
    {
      value: 'carbon',
      label: '碳记录管理',
      icon: <EcoIcon />,
      children: [
        {
          value: '/carbon/list',
          label: '碳记录列表',
        },
      ],
    },
    {
      value: 'statistics',
      label: '统计分析',
      icon: <ChartIcon />,
      children: [
        {
          value: '/statistics/data',
          label: '数据统计',
        },
        {
          value: '/statistics/behavior',
          label: '用户行为分析',
        },
      ],
    },
    {
      value: 'system',
      label: '系统管理',
      icon: <SettingIcon />,
      children: [
        {
          value: '/system/settings',
          label: '系统设置',
        },
        {
          value: '/system/logs',
          label: '系统日志',
        },
      ],
    },
  ];

  const handleMenuClick = ({ value }) => {
    navigate(value);
  };

  const getSelectedKeys = () => {
    const pathname = location.pathname;
    if (pathname === '/') return ['/'];
    
    // 查找匹配的菜单项
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (pathname.startsWith(child.value)) {
            return [child.value];
          }
        }
      } else if (pathname.startsWith(item.value)) {
        return [item.value];
      }
    }
    return [];
  };

  return (
    <TLayout style={{ height: '100vh' }}>
      <Header style={{ padding: '0 24px', borderBottom: '1px solid var(--td-border-level-1-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="text"
              shape="square"
              icon={collapsed ? <MenuUnfoldIcon /> : <MenuFoldIcon />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h2 style={{ margin: '0 0 0 16px', color: 'var(--td-text-color-primary)' }}>
              绿邻居后台管理系统
            </h2>
          </div>
          <div>
            <Button variant="text">退出登录</Button>
          </div>
        </div>
      </Header>
      <TLayout>
        <Aside width={collapsed ? '64px' : '240px'} style={{ transition: 'width 0.2s' }}>
          <Menu
            value={getSelectedKeys()}
            collapsed={collapsed}
            options={menuItems}
            onClick={handleMenuClick}
            style={{ height: '100%', borderRight: '1px solid var(--td-border-level-1-color)' }}
          />
        </Aside>
        <Content style={{ padding: '24px', backgroundColor: 'var(--td-bg-color-container)' }}>
          <Outlet />
        </Content>
      </TLayout>
    </TLayout>
  );
};

export default Layout;