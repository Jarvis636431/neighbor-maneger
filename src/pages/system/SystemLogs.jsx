import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Space, Tag, Select, DatePicker, MessagePlugin, Drawer, Textarea } from 'tdesign-react';
import { SearchIcon, RefreshIcon, DownloadIcon, ViewIcon, DeleteIcon } from 'tdesign-icons-react';
import PageTable from '../../components/PageTable';
import ConfirmDialog from '../../components/ConfirmDialog';
// import axios from 'axios';

const SystemLogs = () => {
  const [searchForm, setSearchForm] = useState({
    keyword: '',
    level: '',
    module: '',
    dateRange: [],
  });
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [logDetailVisible, setLogDetailVisible] = useState(false);
  const [clearDialogVisible, setClearDialogVisible] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

  const logLevelOptions = [
    { label: '全部', value: '' },
    { label: 'Error', value: 'error' },
    { label: 'Warn', value: 'warn' },
    { label: 'Info', value: 'info' },
    { label: 'Debug', value: 'debug' },
  ];

  const moduleOptions = [
    { label: '全部', value: '' },
    { label: '用户管理', value: 'user' },
    { label: '队伍管理', value: 'team' },
    { label: '活动管理', value: 'activity' },
    { label: '打卡管理', value: 'checkin' },
    { label: '积分管理', value: 'points' },
    { label: '系统管理', value: 'system' },
    { label: '认证授权', value: 'auth' },
    { label: '文件上传', value: 'upload' },
  ];

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      width: 180,
      render: (timestamp) => {
        return new Date(timestamp).toLocaleString();
      },
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 80,
      render: (level) => {
        const colorMap = {
          error: 'error',
          warn: 'warning',
          info: 'primary',
          debug: 'default',
        };
        return <Tag theme={colorMap[level] || 'default'}>{level.toUpperCase()}</Tag>;
      },
    },
    {
      title: '模块',
      dataIndex: 'module',
      width: 100,
      render: (module) => {
        const moduleMap = {
          user: '用户管理',
          team: '队伍管理',
          activity: '活动管理',
          checkin: '打卡管理',
          points: '积分管理',
          system: '系统管理',
          auth: '认证授权',
          upload: '文件上传',
        };
        return moduleMap[module] || module;
      },
    },
    {
      title: '操作用户',
      dataIndex: 'username',
      width: 120,
      render: (username) => username || '-',
    },
    {
      title: '消息',
      dataIndex: 'message',
      ellipsis: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            theme="primary"
            variant="text"
            size="small"
            icon={<ViewIcon />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchLogs();
  }, [pagination.current, pagination.pageSize]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/system/logs', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     ...searchForm,
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));
      
      // 模拟数据
      setTimeout(() => {
        const mockLogs = Array.from({ length: pagination.pageSize }, (_, index) => {
          const id = (pagination.current - 1) * pagination.pageSize + index + 1;
          const levels = ['error', 'warn', 'info', 'debug'];
          const modules = ['user', 'team', 'activity', 'checkin', 'points', 'system', 'auth', 'upload'];
          const users = ['admin', 'user001', 'user002', '', ''];
          const messages = [
            '用户登录成功',
            '创建新队伍',
            '活动审核通过',
            '打卡记录提交',
            '积分调整操作',
            '系统配置更新',
            '文件上传失败',
            '数据库连接异常',
            '用户权限验证',
            '缓存清理完成',
          ];
          
          return {
            id,
            timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            level: levels[Math.floor(Math.random() * levels.length)],
            module: modules[Math.floor(Math.random() * modules.length)],
            username: users[Math.floor(Math.random() * users.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            requestId: `req_${Math.random().toString(36).substr(2, 9)}`,
            duration: Math.floor(Math.random() * 1000),
            stackTrace: Math.random() > 0.7 ? 'Error: Something went wrong\n    at Function.handler (/app/src/handlers/user.js:25:10)\n    at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)' : null,
          };
        });
        
        setTableData(mockLogs);
        setPagination(prev => ({ ...prev, total: 1000 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取日志失败:', error);
      MessagePlugin.error('获取日志失败');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }));
    fetchLogs();
  };

  const handleReset = () => {
    setSearchForm({
      keyword: '',
      level: '',
      module: '',
      dateRange: [],
    });
    setPagination(prev => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchLogs();
    }, 100);
  };

  const handleRefresh = () => {
    fetchLogs();
  };

  const handleExport = async () => {
    try {
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/system/logs/export', {
      //   params: searchForm,
      //   responseType: 'blob',
      // });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `system_logs_${new Date().toISOString().split('T')[0]}.csv`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      
      // 模拟导出
      MessagePlugin.success('日志导出成功');
    } catch (error) {
      console.error('导出日志失败:', error);
      MessagePlugin.error('导出日志失败');
    }
  };

  const handleClearLogs = async () => {
    try {
      setClearLoading(true);
      
      // TODO: 替换为实际的API调用
      // await axios.delete('/api/system/logs/clear');
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success('日志清理成功');
      setClearDialogVisible(false);
      fetchLogs();
    } catch (error) {
      console.error('清理日志失败:', error);
      MessagePlugin.error('清理日志失败');
    } finally {
      setClearLoading(false);
    }
  };

  const handleViewDetail = (record) => {
    setSelectedLog(record);
    setLogDetailVisible(true);
  };

  const handlePageChange = (pageInfo) => {
    setPagination(prev => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  return (
    <div>
      <Card title="系统日志">
        {/* 搜索区域 */}
        <div style={{ marginBottom: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space wrap>
              <Input
                placeholder="搜索关键词"
                value={searchForm.keyword}
                onChange={(value) => setSearchForm(prev => ({ ...prev, keyword: value }))}
                style={{ width: '200px' }}
              />
              <Select
                placeholder="日志级别"
                value={searchForm.level}
                onChange={(value) => setSearchForm(prev => ({ ...prev, level: value }))}
                options={logLevelOptions}
                style={{ width: '120px' }}
              />
              <Select
                placeholder="模块"
                value={searchForm.module}
                onChange={(value) => setSearchForm(prev => ({ ...prev, module: value }))}
                options={moduleOptions}
                style={{ width: '120px' }}
              />
              <DatePicker
                mode="date"
                range
                placeholder={['开始日期', '结束日期']}
                value={searchForm.dateRange}
                onChange={(value) => setSearchForm(prev => ({ ...prev, dateRange: value }))}
                style={{ width: '280px' }}
              />
            </Space>
            <Space>
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
              <Button
                theme="danger"
                variant="outline"
                icon={<DeleteIcon />}
                onClick={() => setClearDialogVisible(true)}
              >
                清理日志
              </Button>
            </Space>
          </Space>
        </div>

        {/* 表格 */}
        <PageTable
          data={tableData}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* 日志详情抽屉 */}
      <Drawer
        title="日志详情"
        visible={logDetailVisible}
        onClose={() => setLogDetailVisible(false)}
        size="large"
      >
        {selectedLog && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="基本信息">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <strong>时间：</strong>
                  <div>{new Date(selectedLog.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <strong>级别：</strong>
                  <div>
                    <Tag theme={selectedLog.level === 'error' ? 'error' : selectedLog.level === 'warn' ? 'warning' : 'primary'}>
                      {selectedLog.level.toUpperCase()}
                    </Tag>
                  </div>
                </div>
                <div>
                  <strong>模块：</strong>
                  <div>{selectedLog.module}</div>
                </div>
                <div>
                  <strong>用户：</strong>
                  <div>{selectedLog.username || '-'}</div>
                </div>
                <div>
                  <strong>IP地址：</strong>
                  <div>{selectedLog.ip}</div>
                </div>
                <div>
                  <strong>请求ID：</strong>
                  <div>{selectedLog.requestId}</div>
                </div>
                <div>
                  <strong>耗时：</strong>
                  <div>{selectedLog.duration}ms</div>
                </div>
              </div>
            </Card>
            
            <Card title="消息内容">
              <Textarea
                value={selectedLog.message}
                readonly
                autosize={{ minRows: 3, maxRows: 6 }}
              />
            </Card>
            
            <Card title="User Agent">
              <Textarea
                value={selectedLog.userAgent}
                readonly
                autosize={{ minRows: 2, maxRows: 4 }}
              />
            </Card>
            
            {selectedLog.stackTrace && (
              <Card title="堆栈跟踪">
                <Textarea
                  value={selectedLog.stackTrace}
                  readonly
                  autosize={{ minRows: 5, maxRows: 10 }}
                  style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
              </Card>
            )}
          </Space>
        )}
      </Drawer>

      {/* 清理确认对话框 */}
      <ConfirmDialog
        visible={clearDialogVisible}
        title="确认清理"
        content="确定要清理所有日志吗？此操作不可恢复。"
        confirmText="确认清理"
        cancelText="取消"
        loading={clearLoading}
        onConfirm={handleClearLogs}
        onCancel={() => setClearDialogVisible(false)}
      />
    </div>
  );
};

export default SystemLogs;