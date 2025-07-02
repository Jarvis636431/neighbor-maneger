import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'tdesign-react';
import { UserIcon, UserGroupIcon, CalendarIcon, ArticleIcon } from 'tdesign-icons-react';
// import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingTeams: 0,
    totalActivities: 0,
    totalNews: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/dashboard/stats');
      // setStats(response.data);
      
      // 模拟数据
      setTimeout(() => {
        setStats({
          totalUsers: 1234,
          pendingTeams: 15,
          totalActivities: 89,
          totalNews: 45,
        });
        
        // 模拟图表数据
        setChartData([
          { date: '2024-01-01', activeUsers: 120 },
          { date: '2024-01-02', activeUsers: 150 },
          { date: '2024-01-03', activeUsers: 180 },
          { date: '2024-01-04', activeUsers: 200 },
          { date: '2024-01-05', activeUsers: 170 },
          { date: '2024-01-06', activeUsers: 190 },
          { date: '2024-01-07', activeUsers: 220 },
        ]);
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('获取仪表板数据失败:', error);
      setLoading(false);
    }
  };

  const statisticCards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: <UserIcon size="24px" />,
      color: '#0052d9',
    },
    {
      title: '待审核队伍',
      value: stats.pendingTeams,
      icon: <UserGroupIcon size="24px" />,
      color: '#e37318',
    },
    {
      title: '活动总数',
      value: stats.totalActivities,
      icon: <CalendarIcon size="24px" />,
      color: '#00a870',
    },
    {
      title: '资讯总数',
      value: stats.totalNews,
      icon: <ArticleIcon size="24px" />,
      color: '#834ec2',
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>系统概览</h1>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {statisticCards.map((card, index) => (
          <Col span={6} key={index}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--td-text-color-secondary)', marginBottom: '8px' }}>
                    {card.title}
                  </div>
                  <Statistic
                    value={card.value}
                    loading={loading}
                    style={{ fontSize: '24px', fontWeight: 'bold' }}
                  />
                </div>
                <div style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="今日活跃用户趋势">
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {loading ? (
                <div>加载中...</div>
              ) : (
                <div>
                  <p>图表组件位置</p>
                  <p style={{ fontSize: '12px', color: 'var(--td-text-color-secondary)' }}>
                    可集成 ECharts 或其他图表库显示活跃用户趋势
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    {chartData.map((item, index) => (
                      <div key={index} style={{ marginBottom: '4px', fontSize: '12px' }}>
                        {item.date}: {item.activeUsers} 人
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="系统状态">
            <div style={{ height: '300px', padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>服务器状态</span>
                  <span style={{ color: '#00a870' }}>正常</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>数据库连接</span>
                  <span style={{ color: '#00a870' }}>正常</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>缓存服务</span>
                  <span style={{ color: '#00a870' }}>正常</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>存储空间</span>
                  <span style={{ color: '#e37318' }}>75% 已使用</span>
                </div>
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <h4>快速操作</h4>
                <div style={{ marginTop: '12px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <a href="#/team/audit" style={{ color: 'var(--td-brand-color)' }}>查看待审核队伍</a>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <a href="#/activity/audit" style={{ color: 'var(--td-brand-color)' }}>查看待审核活动</a>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <a href="#/news/edit" style={{ color: 'var(--td-brand-color)' }}>发布新资讯</a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;