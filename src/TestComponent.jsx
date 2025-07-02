import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ padding: '20px', fontSize: '18px' }}>
      <h1>测试页面 - 不使用TDesign</h1>
      <p>如果你能看到这个页面，说明React基础渲染正常</p>
      <p>问题可能出在TDesign组件或路由配置上</p>
    </div>
  );
};

export default TestComponent;