import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTable from "../components/PageTable";
import ConfirmDialog from "../components/ConfirmDialog";
import { Card, Button, Input, Tag, Select, Space } from "../components/ui";

const Image = ({ src, width, height, style, fallback }) => (
  <img
    src={src}
    width={width}
    height={height}
    style={style}
    onError={(e) => {
      e.target.src = fallback;
    }}
    alt=""
  />
);

// 移除不再使用的icon组件

const NewsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [confirmDialog, setConfirmDialog] = useState({
    visible: false,
    title: "",
    content: "",
    onConfirm: null,
    loading: false,
  });

  const statusOptions = [
    { label: "全部状态", value: "" },
    { label: "已发布", value: "published" },
    { label: "草稿", value: "draft" },
    { label: "已下线", value: "offline" },
  ];

  useEffect(() => {
    fetchNewsList();
  }, [pagination.current, pagination.pageSize]);

  const fetchNewsList = async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/news', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     status: statusFilter,
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));

      // 模拟数据
      setTimeout(() => {
        const statuses = ["published", "draft", "offline"];
        const allMockData = Array.from({ length: 50 }, (_, index) => {
          const status = statuses[index % statuses.length];

          return {
            id: index + 1,
            title: `环保资讯${index + 1}`,
            coverImage: `https://picsum.photos/100/60?random=${index}`,
            content:
              "这是一篇关于环保的资讯内容，介绍了垃圾分类的重要性和具体方法...",
            status: status,
            author: "管理员",
            viewCount: Math.floor(Math.random() * 1000) + 100,
            likeCount: Math.floor(Math.random() * 100) + 10,
            createTime: "2024-01-20 10:30:00",
            updateTime: "2024-01-21 15:20:00",
            publishTime: status === "published" ? "2024-01-21 16:00:00" : null,
          };
        });

        // 应用筛选条件
        let filteredData = allMockData;

        // 按标题搜索
        if (searchValue) {
          filteredData = filteredData.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // 按状态筛选
        if (statusFilter) {
          filteredData = filteredData.filter(
            (item) => item.status === statusFilter
          );
        }

        // 分页处理
        const startIndex = (pagination.current - 1) * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        setTableData(paginatedData);
        setPagination((prev) => ({ ...prev, total: filteredData.length }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("获取资讯列表失败:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchNewsList();
  };

  const handleReset = () => {
    setSearchValue("");
    setStatusFilter("");
    setPagination((prev) => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchNewsList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination((prev) => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleCreate = () => {
    navigate("/news/edit");
  };

  const handleEdit = (record) => {
    navigate(`/news/edit/${record.id}`);
  };

  const handleDelete = (record) => {
    setConfirmDialog({
      visible: true,
      title: "确认删除",
      content: `确定要删除资讯「${record.title}」吗？删除后无法恢复。`,
      onConfirm: () => performDelete(record.id),
      loading: false,
    });
  };

  const performDelete = async () => {
    try {
      setConfirmDialog((prev) => ({ ...prev, loading: true }));

      // TODO: 替换为实际的API调用
      // await axios.delete(`/api/news/${newsId}`);

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setConfirmDialog({
        visible: false,
        title: "",
        content: "",
        onConfirm: null,
        loading: false,
      });
      fetchNewsList(); // 刷新列表
    } catch (error) {
      console.error("删除失败:", error);
      setConfirmDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleToggleStatus = async (record, newStatus) => {
    try {
      // TODO: 替换为实际的API调用
      // await axios.patch(`/api/news/${record.id}/status`, { status: newStatus });

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log(`更新资讯 ${record.id} 状态为 ${newStatus}`);
      fetchNewsList(); // 刷新列表
    } catch (error) {
      console.error("状态更新失败:", error);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      published: { color: "success", text: "已发布" },
      draft: { color: "warning", text: "草稿" },
      offline: { color: "default", text: "已下线" },
    };
    const config = statusMap[status] || { color: "default", text: "未知" };
    return <Tag theme={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      colKey: "id",
      title: "ID",
      width: 80,
    },
    {
      colKey: "coverImage",
      title: "封面",
      width: 120,
      cell: ({ row }) => (
        <Image
          src={row.coverImage}
          width={80}
          height={50}
          fit="cover"
          style={{ borderRadius: "4px" }}
          fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA4MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zNSAyMEg0NVYzMEgzNVYyMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+"
        />
      ),
    },
    {
      colKey: "title",
      title: "资讯标题",
      width: 250,
      ellipsis: true,
    },
    {
      colKey: "author",
      title: "作者",
      width: 100,
    },
    {
      colKey: "status",
      title: "状态",
      width: 100,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: "stats",
      title: "数据统计",
      width: 120,
      cell: ({ row }) => (
        <div style={{ fontSize: "12px" }}>
          <div>浏览: {row.viewCount}</div>
          <div>点赞: {row.likeCount}</div>
        </div>
      ),
    },
    {
      colKey: "publishTime",
      title: "发布时间",
      width: 160,
      cell: ({ row }) => row.publishTime || "-",
    },
    {
      colKey: "updateTime",
      title: "更新时间",
      width: 160,
    },
    {
      colKey: "operation",
      title: "操作",
      width: 200,
      cell: ({ row }) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleEdit(row)}
          >
            编辑
          </Button>
          {row.status === 'draft' && (
            <Button
              size="small"
              theme="success"
              onClick={() => handleToggleStatus(row, 'published')}
            >
              发布
            </Button>
          )}
          {row.status === 'published' && (
            <Button
              size="small"
              theme="warning"
              onClick={() => handleToggleStatus(row, 'offline')}
            >
              下线
            </Button>
          )}
          <Button
            size="small"
            theme="danger"
            onClick={() => handleDelete(row)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space wrap>
            <Input
              placeholder="搜索资讯标题"
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: "250px" }}
              clearable
            />
            <Select
              placeholder="选择状态"
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              style={{ width: "120px" }}
              clearable
            />
            <Button theme="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button variant="outline" onClick={handleReset}>
              重置
            </Button>
          </Space>

          <Button theme="primary" onClick={handleCreate}>
            发布资讯
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

      <ConfirmDialog
        visible={confirmDialog.visible}
        title={confirmDialog.title}
        content={confirmDialog.content}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() =>
          setConfirmDialog({
            visible: false,
            title: "",
            content: "",
            onConfirm: null,
            loading: false,
          })
        }
        loading={confirmDialog.loading}
      />
    </div>
  );
};

export default NewsList;
