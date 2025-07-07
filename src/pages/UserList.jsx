import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTable from "../components/PageTable";
import {
  Card,
  Button,
  Input,
  Space,
  Avatar,
} from "../components/ui";

// 模拟图标组件
const SearchIcon = () => <span>🔍</span>;
const ViewIcon = () => <span>👁️</span>;
const BanIcon = () => <span>🚫</span>;
const CheckCircleIcon = () => <span>✅</span>;

const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });




  useEffect(() => {
    fetchUserList();
  }, [pagination.current, pagination.pageSize]);

  const fetchUserList = async () => {
    try {
      setLoading(true);

      // 立即设置模拟数据，不使用setTimeout
      const mockData = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        nickname: `绿邻居${index + 1}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${index + 1}`,
        phone: `138****000${index + 1}`,
        points: 100 + index * 50,
        registerTime: "2024-01-15 09:30:00",
      }));

      setTableData(mockData);
      setPagination((prev) => ({ ...prev, total: 5 }));
      setLoading(false);
    } catch (error) {
      console.error("获取用户列表失败:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchUserList();
  };

  const handleReset = () => {
    setSearchValue("");
    setPagination((prev) => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchUserList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination((prev) => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleViewDetail = (record) => {
    navigate(`/user/detail/${record.id}`);
  };





  const columns = [
    {
      colKey: "id",
      title: "ID",
      width: 80,
    },
    {
      colKey: "nickname",
      title: "昵称",
      width: 150,
    },
    {
      colKey: "avatar",
      title: "头像",
      width: 80,
      cell: ({ value }) => (
        <Avatar
          src={value}
          size="small"
          style={{ width: 32, height: 32 }}
        />
      ),
    },
    {
      colKey: "phone",
      title: "手机号",
      width: 130,
    },
    {
      colKey: "points",
      title: "积分",
      width: 80,
    },
    {
      colKey: "registerTime",
      title: "注册时间",
      width: 160,
    },
    {
      colKey: "operation",
      title: "操作",
      width: 100,
      cell: ({ row }) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleViewDetail(row)}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <Space wrap>
            <Input
              placeholder="请输入昵称"
              value={searchValue}
              onChange={setSearchValue}
              style={{ width: "200px" }}
              clearable
            />

            <Button theme="primary" onClick={handleSearch}>
              搜索
            </Button>
            <Button variant="outline" onClick={handleReset}>
              重置
            </Button>
          </Space>
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

export default UserList;
