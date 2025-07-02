import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';

// 页面组件导入
import Dashboard from '../pages/dashboard/Dashboard';
import TeamList from '../pages/team/TeamList';
import TeamAudit from '../pages/team/TeamAudit';
import TeamDetail from '../pages/team/TeamDetail';
import ActivityList from '../pages/activity/ActivityList';
import ActivityAudit from '../pages/activity/ActivityAudit';
import ActivityDetail from '../pages/activity/ActivityDetail';
import NewsEdit from '../pages/news/NewsEdit';
import NewsList from '../pages/news/NewsList';
import UserList from '../pages/user/UserList';
import UserDetail from '../pages/user/UserDetail';
import PointsList from '../pages/points/PointsList';
import PointsAdjust from '../pages/points/PointsAdjust';
import CheckinList from '../pages/checkin/CheckinList';
import CheckinDetail from '../pages/checkin/CheckinDetail';
import CarbonList from '../pages/carbon/CarbonList';
import SystemSettings from '../pages/system/SystemSettings';
import SystemLogs from '../pages/system/SystemLogs';
import DataStatistics from '../pages/statistics/DataStatistics';
import UserBehavior from '../pages/statistics/UserBehavior';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
            path: 'audit',
            element: <TeamAudit />,
          },
          {
            path: 'detail/:id',
            element: <TeamDetail />,
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
            path: 'audit',
            element: <ActivityAudit />,
          },
          {
            path: 'detail/:id',
            element: <ActivityDetail />,
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: 'edit',
            element: <NewsEdit />,
          },
          {
            path: 'edit/:id',
            element: <NewsEdit />,
          },
          {
            path: 'list',
            element: <NewsList />,
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
            element: <UserDetail />,
          },
        ],
      },
      {
        path: 'points',
        children: [
          {
            path: 'list',
            element: <PointsList />,
          },
          {
            path: 'adjust',
            element: <PointsAdjust />,
          },
        ],
      },
      {
        path: 'checkin',
        children: [
          {
            path: 'list',
            element: <CheckinList />,
          },
          {
            path: 'detail/:id',
            element: <CheckinDetail />,
          },
        ],
      },
      {
        path: 'carbon',
        children: [
          {
            path: 'list',
            element: <CarbonList />,
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'settings',
            element: <SystemSettings />,
          },
          {
            path: 'logs',
            element: <SystemLogs />,
          },
        ],
      },
      {
        path: 'statistics',
        children: [
          {
            path: 'data',
            element: <DataStatistics />,
          },
          {
            path: 'behavior',
            element: <UserBehavior />,
          },
        ],
      },
    ],
  },
]);

export default router;