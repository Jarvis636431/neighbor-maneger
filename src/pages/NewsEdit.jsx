import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Input, Select, Space } from '../components/ui';

const NewsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    coverImage: null,
    author: '管理员'
  });
  const [imagePreview, setImagePreview] = useState('');



  useEffect(() => {
    if (isEdit) {
      fetchNewsDetail();
    }
  }, [id, isEdit]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get(`/api/news/${id}`);
      // setFormData(response.data);
      
      // 模拟数据
      setTimeout(() => {
        const mockData = {
          id: parseInt(id),
          title: `环保资讯${id}`,
          url: `https://example.com/news/${id}`,
          coverImage: null,
          author: '管理员'
        };
        setImagePreview(`https://picsum.photos/400/240?random=${id}`);
        setFormData(mockData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('获取资讯详情失败:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      
      // 创建预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (isDraft = false) => {
    if (!formData.title.trim()) {
      alert('请输入资讯标题');
      return;
    }
    if (!formData.url.trim()) {
      alert('请输入资讯链接');
      return;
    }

    try {
      setLoading(true);
      
      const submitData = {
        ...formData,
        status: isDraft ? 'draft' : 'published'
      };
      
      // TODO: 替换为实际的API调用
      if (isEdit) {
        // await axios.put(`/api/news/${id}`, submitData);
        console.log('更新资讯:', submitData);
      } else {
        // await axios.post('/api/news', submitData);
        console.log('创建资讯:', submitData);
      }
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message = isDraft ? '已保存为草稿！' : (isEdit ? '资讯更新成功！' : '资讯发布成功！');
      alert(message);
      navigate('/news');
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/news');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            {isEdit ? '编辑资讯' : '发布资讯'}
          </h2>
        </div>

        <div style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              资讯标题 <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <Input
              placeholder="请输入资讯标题"
              value={formData.title}
              onChange={(value) => handleInputChange('title', value)}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              封面图片
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            />
            {imagePreview && (
              <div style={{ marginTop: '8px' }}>
                <img 
                  src={imagePreview} 
                  alt="封面预览" 
                  style={{ 
                    width: '200px', 
                    height: '120px', 
                    objectFit: 'cover', 
                    borderRadius: '4px',
                    border: '1px solid #d9d9d9'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              资讯链接 <span style={{ color: '#ff4d4f' }}>*</span>
            </label>
            <Input
              placeholder="请输入资讯链接URL"
              value={formData.url}
              onChange={(value) => handleInputChange('url', value)}
              style={{ width: '100%' }}
            />
          </div>



          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              作者
            </label>
            <Input
              placeholder="请输入作者"
              value={formData.author}
              onChange={(value) => handleInputChange('author', value)}
              style={{ width: '200px' }}
            />
          </div>

          <div style={{ marginTop: '32px' }}>
            <Space>
              <Button 
                theme="primary" 
                onClick={() => handleSubmit(false)}
                loading={loading}
              >
                {isEdit ? '更新资讯' : '发布资讯'}
              </Button>
              <Button 
                onClick={() => handleSubmit(true)}
                loading={loading}
              >
                存为草稿
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={loading}
              >
                取消
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsEdit;