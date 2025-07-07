import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import PlaceholderPage from '../components/PlaceholderPage';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginRedirect from '../components/LoginRedirect';

// 页面组件导入
import Dashboard from '../pages/Dashboard';
import TeamList from '../pages/TeamList';
import ActivityList from '../pages/ActivityList';
import UserList from '../pages/UserList';
import NewsList from '../pages/NewsList';
import NewsEdit from '../pages/NewsEdit';
import Login from '../pages/Login';

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
        element: <TeamList />,
      },
      {
        path: 'team/detail/:id',
        element: <PlaceholderPage title="队伍详情" />,
      },
      {
        path: 'activity',
        element: <ActivityList />,
      },
      {
        path: 'activity/detail/:id',
        element: <PlaceholderPage title="活动详情" />,
      },
      {
        path: 'user',
        element: <UserList />,
      },
      {
        path: 'user/detail/:id',
        element: <PlaceholderPage title="用户详情" />,
      },
      {
        path: 'news',
        element: <NewsList />,
      },
      {
        path: 'news/detail/:id',
        element: <PlaceholderPage title="咨询详情" />,
      },
      {
        path: 'news/edit',
        element: <NewsEdit />,
      },
      {
        path: 'news/edit/:id',
        element: <NewsEdit />,
      },
    ],
  },
]);

export default router;