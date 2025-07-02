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
            path: 'detail/:id',
            element: <PlaceholderPage title="活动详情" />,
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
        path: 'news',
        children: [
          {
            path: 'list',
            element: <PlaceholderPage title="咨询列表" />,
          },
          {
            path: 'detail/:id',
            element: <PlaceholderPage title="咨询详情" />,
          },
          {
            path: 'edit',
            element: <PlaceholderPage title="发布咨询" />,
          },
        ],
      },
    ],
  },
]);

export default router;