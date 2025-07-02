import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SimpleLayout from '../components/SimpleLayout';
import PlaceholderPage from '../components/PlaceholderPage';

// 页面组件导入
import SimpleDashboard from '../pages/dashboard/SimpleDashboard';
import TeamList from '../pages/team/TeamList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SimpleLayout />,
    children: [
      {
        index: true,
        element: <SimpleDashboard />,
      },
      {
        path: 'team',
        children: [
          {
            path: 'list',
            element: <TeamList />,
          },
          {
            path: 'audit',
            element: <PlaceholderPage title="队伍审核" />,
          },
          {
            path: 'detail/:id',
            element: <PlaceholderPage title="队伍详情" />,
          },
        ],
      },
      {
        path: 'activity',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="活动列表" />,
          },
          {
            path: 'audit',
            element: <PlaceholderPage title="活动审核" />,
          },
          {
            path: 'detail/:id',
            element: <PlaceholderPage title="活动详情" />,
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: 'edit',
            element: <PlaceholderPage title="新闻编辑" />,
          },
          {
            path: 'edit/:id',
            element: <PlaceholderPage title="新闻编辑" />,
          },
          {
            path: 'list',
            element: <PlaceholderPage title="新闻列表" />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="用户列表" />,
          },
          {
            path: 'detail/:id',
            element: <PlaceholderPage title="用户详情" />,
          },
        ],
      },
      {
        path: 'points',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="积分列表" />,
          },
          {
            path: 'adjust',
            element: <PlaceholderPage title="积分调整" />,
          },
        ],
      },
      {
        path: 'checkin',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="签到列表" />,
          },
          {
            path: 'detail/:id',
            element: <PlaceholderPage title="签到详情" />,
          },
        ],
      },
      {
        path: 'carbon',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="碳积分列表" />,
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'settings',
            element: <PlaceholderPage title="系统设置" />,
          },
          {
            path: 'logs',
            element: <PlaceholderPage title="系统日志" />,
          },
        ],
      },
      {
        path: 'statistics',
        children: [
          {
            path: 'data',
            element: <PlaceholderPage title="数据统计" />,
          },
          {
            path: 'behavior',
            element: <PlaceholderPage title="用户行为" />,
          },
        ],
      },
    ],
  },
]);

export default router;