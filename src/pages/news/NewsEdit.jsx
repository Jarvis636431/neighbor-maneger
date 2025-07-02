import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Textarea, Upload, Button, MessagePlugin, Space } from 'tdesign-react';
import { CloudUploadIcon, SaveIcon, ArrowLeftIcon } from 'tdesign-icons-react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const NewsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const isEdit = !!id;

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
      // const newsData = response.data;
      
      // 模拟数据
      setTimeout(() => {
        const newsData = {
          title: '环保知识科普：垃圾分类的重要性',
          content: '垃圾分类是环保的重要组成部分，通过正确的垃圾分类，我们可以有效减少环境污染，提高资源回收利用率。本文将详细介绍垃圾分类的方法和意义。\n\n一、垃圾分类的基本原则\n1. 可回收物：包括纸类、塑料、金属、玻璃等\n2. 有害垃圾：包括电池、灯管、药品等\n3. 湿垃圾：包括食物残渣、果皮等\n4. 干垃圾：除上述三类外的其他垃圾\n\n二、垃圾分类的意义\n通过垃圾分类，我们可以：\n- 减少环境污染\n- 提高资源利用率\n- 降低处理成本\n- 保护生态环境',
          coverImage: 'https://example.com/image.jpg',
          status: 'draft',
        };
        
        form.setFieldsValue({
          title: newsData.title,
          content: newsData.content,
        });
        
        if (newsData.coverImage) {
          setFileList([{
            uid: '1',
            name: 'cover.jpg',
            status: 'success',
            url: newsData.coverImage,
          }]);
        }
        
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('获取资讯详情失败:', error);
      MessagePlugin.error('获取资讯详情失败');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validate();
      setSubmitLoading(true);
      
      const formData = {
        ...values,
        coverImage: fileList.length > 0 ? fileList[0].url : '',
      };
      
      // TODO: 替换为实际的API调用
      if (isEdit) {
        // await axios.put(`/api/news/${id}`, formData);
        console.log('更新资讯:', formData);
      } else {
        // await axios.post('/api/news', formData);
        console.log('创建资讯:', formData);
      }
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success(isEdit ? '更新成功' : '发布成功');
      navigate('/news/list');
    } catch (error) {
      console.error('保存失败:', error);
      MessagePlugin.error('保存失败');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await form.validate();
      setSubmitLoading(true);
      
      // TODO: 替换为实际的API调用
      // const values = await form.validate();
      // await axios.post('/api/news/draft', {
      //   ...values,
      //   coverImage: fileList.length > 0 ? fileList[0].url : '',
      //   status: 'draft',
      // });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      MessagePlugin.success('保存草稿成功');
    } catch (error) {
      console.error('保存草稿失败:', error);
      MessagePlugin.error('保存草稿失败');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUploadChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    
    if (file.status === 'success') {
      MessagePlugin.success('图片上传成功');
    } else if (file.status === 'fail') {
      MessagePlugin.error('图片上传失败');
    }
  };

  const uploadProps = {
    action: '/api/upload', // TODO: 替换为实际的上传接口
    accept: 'image/*',
    multiple: false,
    max: 1,
    fileList,
    onChange: handleUploadChange,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        MessagePlugin.error('只能上传图片文件');
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        MessagePlugin.error('图片大小不能超过 5MB');
        return false;
      }
      return true;
    },
    // 模拟上传成功
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file);
        onSuccess({
          url: mockUrl,
        });
      }, 1000);
    },
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button
          variant="text"
          icon={<ArrowLeftIcon />}
          onClick={() => navigate('/news/list')}
        >
          返回列表
        </Button>
      </div>

      <Card title={isEdit ? '编辑资讯' : '发布资讯'}>
        <Form
          form={form}
          onSubmit={handleSubmit}
          labelWidth="100px"
          layout="vertical"
        >
          <Form.FormItem
            label="资讯标题"
            name="title"
            rules={[
              { required: true, message: '请输入资讯标题' },
              { max: 100, message: '标题长度不能超过100个字符' },
            ]}
          >
            <Input placeholder="请输入资讯标题" />
          </Form.FormItem>

          <Form.FormItem
            label="封面图片"
            name="coverImage"
          >
            <Upload
              {...uploadProps}
              theme="image"
              tips="支持上传 jpg、png 格式图片，大小不超过 5MB"
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexDirection: 'column',
                height: '200px',
                border: '1px dashed var(--td-border-level-2-color)',
                borderRadius: '6px',
                backgroundColor: 'var(--td-bg-color-container-hover)'
              }}>
                <CloudUploadIcon size="32px" style={{ marginBottom: '8px' }} />
                <div>点击上传封面图片</div>
              </div>
            </Upload>
          </Form.FormItem>

          <Form.FormItem
            label="资讯内容"
            name="content"
            rules={[
              { required: true, message: '请输入资讯内容' },
              { min: 10, message: '内容长度不能少于10个字符' },
            ]}
          >
            <Textarea
              placeholder="请输入资讯内容，支持换行"
              autosize={{ minRows: 10, maxRows: 20 }}
            />
          </Form.FormItem>

          <Form.FormItem>
            <Space>
              <Button
                theme="primary"
                type="submit"
                loading={submitLoading}
                icon={<SaveIcon />}
              >
                {isEdit ? '更新资讯' : '发布资讯'}
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                loading={submitLoading}
              >
                保存草稿
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/news/list')}
              >
                取消
              </Button>
            </Space>
          </Form.FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default NewsEdit;