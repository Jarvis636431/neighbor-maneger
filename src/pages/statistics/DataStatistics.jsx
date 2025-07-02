import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select, DatePicker, Button, Space, MessagePlugin, Loading } from 'tdesign-react';
import { RefreshIcon, DownloadIcon, TrendingUpIcon, TrendingDownIcon, UserIcon, TeamIcon, ActivityIcon, CheckIcon } from 'tdesign-icons-react';
// import axios from 'axios';

const DataStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [dateRange, setDateRange] = useState([]);
  const [statisticsData, setStatisticsData] = useState({
    overview: {
      totalUsers: 0,
      totalTeams: 0,
      totalActivities: 0,
      totalCheckins: 0,
      totalPoints: 0,
      totalCarbon: 0,
    },
    trends: {
      userGrowth: 0,
      teamGrowth: 0,
      activityGrowth: 0,
      checkinGrowth: 0,
    },
    details: {
      userStats: [],
      teamStats: [],
      activityStats: [],
      checkinStats: [],
      pointsStats: [],
      carbonStats: [],
    },
  });

  const timeRangeOptions = [
    { label: '今日', value: 'today' },
    { label: '本周', value: 'week' },
    { label: '本月', value: 'month' },
    { label: '本季度', value: 'quarter' },
    { label: '本年', value: 'year' },
    { label: '自定义', value: 'custom' },
  ];

  useEffect(() => {
    fetchStatistics();
  }, [timeRange, dateRange]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/statistics/data', {
      //   params: {
      //     timeRange,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setStatisticsData(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockData = {
          overview: {
            totalUsers: 12580,
            totalTeams: 856,
            totalActivities: 342,
            totalCheckins: 45620,
            totalPoints: 2856000,
            totalCarbon: 15680.5,
          },
          trends: {
            userGrowth: 12.5,
            teamGrowth: 8.3,
            activityGrowth: -2.1,
            checkinGrowth: 15.7,
          },
          details: {
            userStats: [
              { date: '2024-01-01', count: 100, newUsers: 15 },
              { date: '2024-01-02', count: 115, newUsers: 18 },
              { date: '2024-01-03', count: 133, newUsers: 22 },
              { date: '2024-01-04', count: 155, newUsers: 25 },
              { date: '2024-01-05', count: 180, newUsers: 28 },
              { date: '2024-01-06', count: 208, newUsers: 32 },
              { date: '2024-01-07', count: 240, newUsers: 35 },
            ],
            teamStats: [
              { category: '环保出行', count: 245, percentage: 28.6 },
              { category: '垃圾分类', count: 198, percentage: 23.1 },
              { category: '节能减排', count: 167, percentage: 19.5 },
              { category: '绿色生活', count: 134, percentage: 15.7 },
              { category: '其他', count: 112, percentage: 13.1 },
            ],
            activityStats: [
              { type: '线上活动', count: 156, participants: 2340 },
              { type: '线下活动', count: 98, participants: 1560 },
              { type: '挑战赛', count: 67, participants: 890 },
              { type: '讲座培训', count: 21, participants: 420 },
            ],
            checkinStats: [
              { type: '步行', count: 15680, carbon: 7840.0 },
              { type: '骑行', count: 12340, carbon: 4936.0 },
              { type: '公交', count: 8950, carbon: 1790.0 },
              { type: '垃圾分类', count: 5670, carbon: 850.5 },
              { type: '节能', count: 2980, carbon: 264.0 },
            ],
            pointsStats: [
              { source: '签到打卡', points: 1256000, percentage: 44.0 },
              { source: '活动参与', points: 856000, percentage: 30.0 },
              { source: '邀请好友', points: 428000, percentage: 15.0 },
              { source: '任务完成', points: 214000, percentage: 7.5 },
              { source: '其他', points: 102000, percentage: 3.5 },
            ],
            carbonStats: [
              { month: '2024-01', carbon: 1234.5 },
              { month: '2024-02', carbon: 1456.8 },
              { month: '2024-03', carbon: 1678.2 },
              { month: '2024-04', carbon: 1890.6 },
              { month: '2024-05', carbon: 2123.4 },
              { month: '2024-06', carbon: 2345.7 },
            ],
          },
        };
        
        setStatisticsData(mockData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取统计数据失败:', error);
      MessagePlugin.error('获取统计数据失败');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStatistics();
  };

  const handleExport = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/statistics/export', {
      //   params: {
      //     timeRange,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      //   responseType: 'blob',
      // });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `statistics_${new Date().toISOString().split('T')[0]}.xlsx`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      
      // 模拟导出
      MessagePlugin.success('统计数据导出成功');
    } catch (error) {
      console.error('导出统计数据失败:', error);
      MessagePlugin.error('导出统计数据失败');
    }
  };

  const renderTrendIcon = (value) => {
    if (value > 0) {
      return <TrendingUpIcon style={{ color: '#00a870' }} />;
    } else if (value < 0) {
      return <TrendingDownIcon style={{ color: '#e34d59' }} />;
    }
    return null;
  };

  const renderTrendText = (value) => {
    const color = value > 0 ? '#00a870' : value < 0 ? '#e34d59' : '#666';
    const prefix = value > 0 ? '+' : '';
    return (
      <span style={{ color, fontSize: '14px' }}>
        {prefix}{value}%
      </span>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Loading size="large" text="加载中..." />
      </div>
    );
  }

  return (
    <div>
      {/* 筛选区域 */}
      <Card style={{ marginBottom: '24px' }}>
        <Space>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            options={timeRangeOptions}
            style={{ width: '120px' }}
          />
          {timeRange === 'custom' && (
            <DatePicker
              mode="date"
              range
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '280px' }}
            />
          )}
          <Button
            variant="outline"
            icon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            刷新
          </Button>
          <Button
            variant="outline"
            icon={<DownloadIcon />}
            onClick={handleExport}
          >
            导出
          </Button>
        </Space>
      </Card>

      {/* 概览统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={4}>
          <Card>
            <Statistic
              title="总用户数"
              value={statisticsData.overview.totalUsers}
              prefix={<UserIcon />}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {renderTrendIcon(statisticsData.trends.userGrowth)}
                  {renderTrendText(statisticsData.trends.userGrowth)}
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总队伍数"
              value={statisticsData.overview.totalTeams}
              prefix={<TeamIcon />}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {renderTrendIcon(statisticsData.trends.teamGrowth)}
                  {renderTrendText(statisticsData.trends.teamGrowth)}
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总活动数"
              value={statisticsData.overview.totalActivities}
              prefix={<ActivityIcon />}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {renderTrendIcon(statisticsData.trends.activityGrowth)}
                  {renderTrendText(statisticsData.trends.activityGrowth)}
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总打卡数"
              value={statisticsData.overview.totalCheckins}
              prefix={<CheckIcon />}
              suffix={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {renderTrendIcon(statisticsData.trends.checkinGrowth)}
                  {renderTrendText(statisticsData.trends.checkinGrowth)}
                </div>
              }
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总积分数"
              value={statisticsData.overview.totalPoints}
              precision={0}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="总减碳量(kg)"
              value={statisticsData.overview.totalCarbon}
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      {/* 详细统计 */}
      <Row gutter={[16, 16]}>
        {/* 队伍分类统计 */}
        <Col span={12}>
          <Card title="队伍分类统计">
            <div style={{ padding: '16px 0' }}>
              {statisticsData.details.teamStats.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span>{item.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.count}</span>
                    <span style={{ color: '#666', fontSize: '12px' }}>({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 活动类型统计 */}
        <Col span={12}>
          <Card title="活动类型统计">
            <div style={{ padding: '16px 0' }}>
              {statisticsData.details.activityStats.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span>{item.type}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold' }}>{item.count} 个</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{item.participants} 人参与</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 打卡类型统计 */}
        <Col span={12}>
          <Card title="打卡类型统计">
            <div style={{ padding: '16px 0' }}>
              {statisticsData.details.checkinStats.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span>{item.type}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold' }}>{item.count} 次</div>
                      <div style={{ color: '#666', fontSize: '12px' }}>{item.carbon} kg减碳</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 积分来源统计 */}
        <Col span={12}>
          <Card title="积分来源统计">
            <div style={{ padding: '16px 0' }}>
              {statisticsData.details.pointsStats.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span>{item.source}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.points.toLocaleString()}</span>
                    <span style={{ color: '#666', fontSize: '12px' }}>({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 月度减碳趋势 */}
        <Col span={24}>
          <Card title="月度减碳趋势">
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'end', height: '200px' }}>
                {statisticsData.details.carbonStats.map((item, index) => {
                  const maxValue = Math.max(...statisticsData.details.carbonStats.map(d => d.carbon));
                  const height = (item.carbon / maxValue) * 150;
                  return (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '40px',
                          height: `${height}px`,
                          backgroundColor: '#0052d9',
                          marginBottom: '8px',
                          borderRadius: '4px 4px 0 0',
                          display: 'flex',
                          alignItems: 'end',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          paddingBottom: '4px',
                        }}
                      >
                        {item.carbon}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {item.month.split('-')[1]}月
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataStatistics;