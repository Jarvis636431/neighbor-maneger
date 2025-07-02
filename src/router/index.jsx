import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import PlaceholderPage from '../components/PlaceholderPage';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginRedirect from '../components/LoginRedirect';

// 页面组件导入
import Dashboard from '../pages/dashboard/Dashboard';
import TeamList from '../pages/team/TeamList';
import ActivityList from '../pages/activity/ActivityList';
import UserList from '../pages/user/UserList';
import NewsList from '../pages/news/NewsList';
import Login from '../pages/auth/Login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LoginRedirect>
        <Login />
      </LoginRedirect>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
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
            element: <ActivityList />,
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
            element: <UserList />,
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
            element: <NewsList />,
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