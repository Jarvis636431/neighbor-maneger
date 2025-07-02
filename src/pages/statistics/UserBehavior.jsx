import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, DatePicker, Button, Space, MessagePlugin, Loading, Progress, Tag } from 'tdesign-react';
import { RefreshIcon, DownloadIcon, UserIcon, TimeIcon, LocationIcon, DeviceIcon } from 'tdesign-icons-react';
import PageTable from '../../components/PageTable';
// import axios from 'axios';

const UserBehavior = () => {
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [dateRange, setDateRange] = useState([]);
  const [behaviorData, setBehaviorData] = useState({
    overview: {
      activeUsers: 0,
      avgSessionTime: 0,
      avgDailyUsage: 0,
      retentionRate: 0,
    },
    userActivity: [],
    pageViews: [],
    deviceStats: [],
    locationStats: [],
    timeDistribution: [],
    userSegments: [],
  });
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const timeRangeOptions = [
    { label: '今日', value: 'today' },
    { label: '本周', value: 'week' },
    { label: '本月', value: 'month' },
    { label: '本季度', value: 'quarter' },
    { label: '本年', value: 'year' },
    { label: '自定义', value: 'custom' },
  ];

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
    },
    {
      title: '访问次数',
      dataIndex: 'visitCount',
      width: 100,
    },
    {
      title: '在线时长',
      dataIndex: 'onlineTime',
      width: 120,
      render: (time) => `${Math.floor(time / 60)}h ${time % 60}m`,
    },
    {
      title: '最后访问',
      dataIndex: 'lastVisit',
      width: 180,
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      width: 100,
      render: (type) => {
        const colorMap = {
          mobile: 'primary',
          desktop: 'success',
          tablet: 'warning',
        };
        return <Tag theme={colorMap[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: '地区',
      dataIndex: 'location',
      width: 120,
    },
    {
      title: '活跃度',
      dataIndex: 'activityScore',
      width: 120,
      render: (score) => (
        <Progress
          percentage={score}
          size="small"
          theme={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchBehaviorData();
    fetchUserList();
  }, [timeRange, dateRange, pagination.current, pagination.pageSize]);

  const fetchBehaviorData = async () => {
    try {
      setLoading(true);
      
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/statistics/user-behavior', {
      //   params: {
      //     timeRange,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setBehaviorData(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockData = {
          overview: {
            activeUsers: 8560,
            avgSessionTime: 25.6,
            avgDailyUsage: 3.2,
            retentionRate: 78.5,
          },
          userActivity: [
            { hour: 0, count: 120 },
            { hour: 1, count: 80 },
            { hour: 2, count: 45 },
            { hour: 3, count: 30 },
            { hour: 4, count: 25 },
            { hour: 5, count: 35 },
            { hour: 6, count: 180 },
            { hour: 7, count: 320 },
            { hour: 8, count: 450 },
            { hour: 9, count: 520 },
            { hour: 10, count: 480 },
            { hour: 11, count: 460 },
            { hour: 12, count: 380 },
            { hour: 13, count: 420 },
            { hour: 14, count: 480 },
            { hour: 15, count: 520 },
            { hour: 16, count: 580 },
            { hour: 17, count: 620 },
            { hour: 18, count: 680 },
            { hour: 19, count: 720 },
            { hour: 20, count: 650 },
            { hour: 21, count: 520 },
            { hour: 22, count: 380 },
            { hour: 23, count: 250 },
          ],
          pageViews: [
            { page: '首页', views: 15680, percentage: 25.2 },
            { page: '队伍列表', views: 12340, percentage: 19.8 },
            { page: '活动列表', views: 9870, percentage: 15.9 },
            { page: '打卡页面', views: 8560, percentage: 13.7 },
            { page: '个人中心', views: 6780, percentage: 10.9 },
            { page: '积分商城', views: 4320, percentage: 6.9 },
            { page: '其他页面', views: 4650, percentage: 7.6 },
          ],
          deviceStats: [
            { type: 'mobile', count: 6840, percentage: 79.9 },
            { type: 'desktop', count: 1380, percentage: 16.1 },
            { type: 'tablet', count: 340, percentage: 4.0 },
          ],
          locationStats: [
            { city: '北京', count: 1680, percentage: 19.6 },
            { city: '上海', count: 1420, percentage: 16.6 },
            { city: '广州', count: 980, percentage: 11.4 },
            { city: '深圳', count: 890, percentage: 10.4 },
            { city: '杭州', count: 720, percentage: 8.4 },
            { city: '成都', count: 650, percentage: 7.6 },
            { city: '武汉', count: 580, percentage: 6.8 },
            { city: '南京', count: 520, percentage: 6.1 },
            { city: '其他', count: 1120, percentage: 13.1 },
          ],
          timeDistribution: [
            { period: '早晨(6-12)', count: 2580, percentage: 30.1 },
            { period: '下午(12-18)', count: 3120, percentage: 36.4 },
            { period: '晚上(18-24)', count: 2460, percentage: 28.7 },
            { period: '深夜(0-6)', count: 400, percentage: 4.8 },
          ],
          userSegments: [
            { segment: '高活跃用户', count: 1280, percentage: 15.0, description: '每日使用>2小时' },
            { segment: '中活跃用户', count: 3420, percentage: 40.0, description: '每日使用30分钟-2小时' },
            { segment: '低活跃用户', count: 2560, percentage: 30.0, description: '每日使用<30分钟' },
            { segment: '沉睡用户', count: 1300, percentage: 15.0, description: '7天未登录' },
          ],
        };
        
        setBehaviorData(mockData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取用户行为数据失败:', error);
      MessagePlugin.error('获取用户行为数据失败');
      setLoading(false);
    }
  };

  const fetchUserList = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/statistics/user-list', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     timeRange,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const mockUsers = Array.from({ length: pagination.pageSize }, (_, index) => {
          const id = (pagination.current - 1) * pagination.pageSize + index + 1;
          const deviceTypes = ['mobile', 'desktop', 'tablet'];
          const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京'];
          
          return {
            userId: `U${String(id).padStart(6, '0')}`,
            username: `user${id}`,
            visitCount: Math.floor(Math.random() * 50) + 1,
            onlineTime: Math.floor(Math.random() * 300) + 30,
            lastVisit: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            activityScore: Math.floor(Math.random() * 100),
          };
        });
        
        setTableData(mockUsers);
        setPagination(prev => ({ ...prev, total: 8560 }));
      }, 500);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      MessagePlugin.error('获取用户列表失败');
    }
  };

  const handleRefresh = () => {
    fetchBehaviorData();
    fetchUserList();
  };

  const handleExport = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/statistics/user-behavior/export', {
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
      // link.setAttribute('download', `user_behavior_${new Date().toISOString().split('T')[0]}.xlsx`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      
      // 模拟导出
      MessagePlugin.success('用户行为数据导出成功');
    } catch (error) {
      console.error('导出用户行为数据失败:', error);
      MessagePlugin.error('导出用户行为数据失败');
    }
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
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

      {/* 概览指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserIcon size="24px" style={{ color: '#0052d9' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0052d9' }}>
                  {behaviorData.overview.activeUsers.toLocaleString()}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>活跃用户数</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <TimeIcon size="24px" style={{ color: '#00a870' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00a870' }}>
                  {behaviorData.overview.avgSessionTime}分钟
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>平均会话时长</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <DeviceIcon size="24px" style={{ color: '#ff8800' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff8800' }}>
                  {behaviorData.overview.avgDailyUsage}次
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>日均使用次数</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LocationIcon size="24px" style={{ color: '#e34d59' }} />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e34d59' }}>
                  {behaviorData.overview.retentionRate}%
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>用户留存率</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 详细分析 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {/* 24小时活跃分布 */}
        <Col span={24}>
          <Card title="24小时活跃分布">
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '200px' }}>
                {behaviorData.userActivity.map((item, index) => {
                  const maxValue = Math.max(...behaviorData.userActivity.map(d => d.count));
                  const height = (item.count / maxValue) * 150;
                  return (
                    <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                      <div
                        style={{
                          height: `${height}px`,
                          backgroundColor: '#0052d9',
                          marginBottom: '8px',
                          borderRadius: '2px 2px 0 0',
                          display: 'flex',
                          alignItems: 'end',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '10px',
                          paddingBottom: '2px',
                          margin: '0 1px',
                        }}
                        title={`${item.hour}:00 - ${item.count}人`}
                      >
                        {height > 30 ? item.count : ''}
                      </div>
                      <div style={{ fontSize: '10px', color: '#666' }}>
                        {item.hour}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {/* 页面访问统计 */}
        <Col span={8}>
          <Card title="页面访问统计">
            <div style={{ padding: '16px 0' }}>
              {behaviorData.pageViews.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span>{item.page}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.views.toLocaleString()}</span>
                    <span style={{ color: '#666', fontSize: '12px' }}>({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 设备类型分布 */}
        <Col span={8}>
          <Card title="设备类型分布">
            <div style={{ padding: '16px 0' }}>
              {behaviorData.deviceStats.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{item.type === 'mobile' ? '手机' : item.type === 'desktop' ? '电脑' : '平板'}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <Progress
                    percentage={item.percentage}
                    size="small"
                    theme={index === 0 ? 'primary' : index === 1 ? 'success' : 'warning'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 地区分布 */}
        <Col span={8}>
          <Card title="地区分布">
            <div style={{ padding: '16px 0', maxHeight: '300px', overflowY: 'auto' }}>
              {behaviorData.locationStats.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span>{item.city}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.count}</span>
                    <span style={{ color: '#666', fontSize: '12px' }}>({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {/* 时段分布 */}
        <Col span={12}>
          <Card title="时段分布">
            <div style={{ padding: '16px 0' }}>
              {behaviorData.timeDistribution.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{item.period}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <Progress
                    percentage={item.percentage}
                    size="small"
                    theme={['primary', 'success', 'warning', 'error'][index]}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* 用户分群 */}
        <Col span={12}>
          <Card title="用户分群">
            <div style={{ padding: '16px 0' }}>
              {behaviorData.userSegments.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{item.segment}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{item.description}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold' }}>{item.count}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress
                    percentage={item.percentage}
                    size="small"
                    theme={['success', 'primary', 'warning', 'error'][index]}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 用户详细列表 */}
      <Card title="用户行为详情">
        <PageTable
          data={tableData}
          columns={columns}
          rowKey="userId"
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default UserBehavior;