import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Select, DatePicker, MessagePlugin, Avatar, Statistic, Row, Col } from 'tdesign-react';
import { SearchIcon, RefreshIcon, DownloadIcon, EcoIcon } from 'tdesign-icons-react';
import PageTable from '../../components/PageTable';
// import axios from 'axios';

const CarbonList = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalReduction: 0,
    todayReduction: 0,
    monthReduction: 0,
    userCount: 0,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const typeOptions = [
    { label: '全部类型', value: '' },
    { label: '绿色出行', value: 'transport' },
    { label: '垃圾分类', value: 'waste' },
    { label: '节能减排', value: 'energy' },
    { label: '节约用水', value: 'water' },
    { label: '绿色消费', value: 'consumption' },
    { label: '其他', value: 'other' },
  ];

  useEffect(() => {
    fetchCarbonList();
    fetchStatistics();
  }, [pagination.current, pagination.pageSize]);

  const fetchStatistics = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/carbon/statistics');
      // setStatistics(response.data);
      
      // 模拟数据
      setTimeout(() => {
        setStatistics({
          totalReduction: 15680.5,
          todayReduction: 125.8,
          monthReduction: 3250.2,
          userCount: 1256,
        });
      }, 500);
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  const fetchCarbonList = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/carbon/records', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     type: typeFilter,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const types = ['transport', 'waste', 'energy', 'water', 'consumption', 'other'];
        const sources = ['checkin', 'activity', 'task', 'manual'];
        const mockData = Array.from({ length: pagination.pageSize }, (_, index) => {
          const type = types[Math.floor(Math.random() * types.length)];
          const source = sources[Math.floor(Math.random() * sources.length)];
          
          return {
            id: (pagination.current - 1) * pagination.pageSize + index + 1,
            userId: Math.floor(Math.random() * 1000) + 1,
            username: `user${Math.floor(Math.random() * 1000) + 1}`,
            nickname: `绿邻居${Math.floor(Math.random() * 1000) + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
            type: type,
            source: source,
            amount: (Math.random() * 10).toFixed(2),
            description: getCarbonDescription(type, source),
            relatedId: source === 'activity' ? Math.floor(Math.random() * 100) + 1 : null,
            relatedTitle: source === 'activity' ? `环保活动${Math.floor(Math.random() * 100) + 1}` : null,
            location: '北京市朝阳区',
            createTime: '2024-01-21 14:30:00',
            verifyStatus: Math.random() > 0.1 ? 'verified' : 'pending',
          };
        });
        
        setTableData(mockData);
        setPagination(prev => ({ ...prev, total: 5680 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取碳记录失败:', error);
      MessagePlugin.error('获取碳记录失败');
      setLoading(false);
    }
  };

  const getCarbonDescription = (type, source) => {
    const descriptions = {
      transport: {
        checkin: '公共交通出行减碳',
        activity: '绿色出行活动减碳',
        task: '出行任务完成减碳',
        manual: '手动记录出行减碳',
      },
      waste: {
        checkin: '垃圾分类打卡减碳',
        activity: '垃圾分类活动减碳',
        task: '分类任务完成减碳',
        manual: '手动记录分类减碳',
      },
      energy: {
        checkin: '节能行为打卡减碳',
        activity: '节能活动减碳',
        task: '节能任务完成减碳',
        manual: '手动记录节能减碳',
      },
      water: {
        checkin: '节水行为打卡减碳',
        activity: '节水活动减碳',
        task: '节水任务完成减碳',
        manual: '手动记录节水减碳',
      },
      consumption: {
        checkin: '绿色消费打卡减碳',
        activity: '绿色消费活动减碳',
        task: '消费任务完成减碳',
        manual: '手动记录消费减碳',
      },
      other: {
        checkin: '其他环保行为减碳',
        activity: '其他环保活动减碳',
        task: '其他任务完成减碳',
        manual: '手动记录其他减碳',
      },
    };
    return descriptions[type]?.[source] || '环保行为减碳';
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchCarbonList();
  };

  const handleReset = () => {
    setSearchValue('');
    setTypeFilter('');
    setDateRange([]);
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchCarbonList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleExport = () => {
    // TODO: 实现导出功能
    MessagePlugin.info('导出功能开发中...');
  };

  const getTypeTag = (type) => {
    const typeMap = {
      transport: { color: 'success', text: '绿色出行' },
      waste: { color: 'warning', text: '垃圾分类' },
      energy: { color: 'primary', text: '节能减排' },
      water: { color: 'cyan', text: '节约用水' },
      consumption: { color: 'purple', text: '绿色消费' },
      other: { color: 'default', text: '其他' },
    };
    const config = typeMap[type] || { color: 'default', text: '未知' };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const getSourceTag = (source) => {
    const sourceMap = {
      checkin: { color: 'success', text: '打卡' },
      activity: { color: 'primary', text: '活动' },
      task: { color: 'warning', text: '任务' },
      manual: { color: 'cyan', text: '手动' },
    };
    const config = sourceMap[source] || { color: 'default', text: '未知' };
    return <Tag theme={config.color} variant="outline">{config.text}</Tag>;
  };

  const getVerifyStatusTag = (status) => {
    const statusMap = {
      verified: { color: 'success', text: '已验证' },
      pending: { color: 'warning', text: '待验证' },
      rejected: { color: 'danger', text: '已拒绝' },
    };
    const config = statusMap[status] || { color: 'default', text: '未知' };
    return <Tag theme={config.color} variant="light">{config.text}</Tag>;
  };

  const columns = [
    {
      colKey: 'id',
      title: 'ID',
      width: 80,
    },
    {
      colKey: 'userInfo',
      title: '用户信息',
      width: 150,
      cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={row.avatar} size="small" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{row.nickname}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>@{row.username}</div>
          </div>
        </div>
      ),
    },
    {
      colKey: 'type',
      title: '类型',
      width: 100,
      cell: ({ row }) => getTypeTag(row.type),
    },
    {
      colKey: 'source',
      title: '来源',
      width: 80,
      cell: ({ row }) => getSourceTag(row.source),
    },
    {
      colKey: 'amount',
      title: '减碳量(kg)',
      width: 100,
      cell: ({ row }) => (
        <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
          {row.amount}
        </span>
      ),
    },
    {
      colKey: 'description',
      title: '描述',
      width: 180,
      ellipsis: true,
    },
    {
      colKey: 'relatedInfo',
      title: '关联信息',
      width: 150,
      cell: ({ row }) => (
        row.relatedTitle ? (
          <div style={{ fontSize: '12px' }}>
            <div>{row.relatedTitle}</div>
            <div style={{ color: '#666' }}>ID: {row.relatedId}</div>
          </div>
        ) : '-'
      ),
    },
    {
      colKey: 'location',
      title: '位置',
      width: 120,
    },
    {
      colKey: 'verifyStatus',
      title: '验证状态',
      width: 100,
      cell: ({ row }) => getVerifyStatusTag(row.verifyStatus),
    },
    {
      colKey: 'createTime',
      title: '记录时间',
      width: 160,
    },
  ];

  return (
    <div>
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总减碳量"
              value={statistics.totalReduction}
              suffix="kg"
              trend="increase"
              trendPlacement="left"
              icon={<TrendingUpIcon style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日减碳"
              value={statistics.todayReduction}
              suffix="kg"
              trend="increase"
              trendPlacement="left"
              icon={<TrendingUpIcon style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月减碳"
              value={statistics.monthReduction}
              suffix="kg"
              trend="increase"
              trendPlacement="left"
              icon={<BarChartIcon style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="参与用户"
              value={statistics.userCount}
              suffix="人"
              icon={<TrendingUpIcon style={{ color: '#fa8c16' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space wrap>
            <Input
              placeholder="搜索用户名或昵称"
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: '200px' }}
              clearable
            />
            <Select
              placeholder="选择类型"
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeOptions}
              style={{ width: '120px' }}
              clearable
            />
            <DatePicker
              mode="date"
              range
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '280px' }}
              clearable
            />
            <Button
              theme="primary"
              icon={<SearchIcon />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              重置
            </Button>
          </Space>
          
          <Button
            variant="outline"
            onClick={handleExport}
          >
            导出数据
          </Button>
        </div>
        
        <PageTable
          data={tableData}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default CarbonList;