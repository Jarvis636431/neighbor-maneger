import React from 'react';

const SimpleDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>简化版Dashboard - 不使用TDesign</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>总用户数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0052d9' }}>1234</p>
        </div>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>待审核队伍</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e37318' }}>15</p>
        </div>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>活动总数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00a870' }}>89</p>
        </div>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>资讯总数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#834ec2' }}>45</p>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px'
      }}>
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          <h3>系统状态</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>服务器状态</span>
            <span style={{ color: '#00a870' }}>正常</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>数据库连接</span>
            <span style={{ color: '#00a870' }}>正常</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>存储空间</span>
            <span style={{ color: '#e37318' }}>75% 已使用</span>
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          <h3>快速操作</h3>
          <div style={{ marginBottom: '8px' }}>
            <a href="#/team/audit" style={{ color: '#0052d9', textDecoration: 'none' }}>查看待审核队伍</a>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <a href="#/activity/audit" style={{ color: '#0052d9', textDecoration: 'none' }}>查看待审核活动</a>
          </div>
          <div>
            <a href="#/news/edit" style={{ color: '#0052d9', textDecoration: 'none' }}>发布新资讯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;