import React, { useState, useEffect, useCallback } from "react";
import PageTable from "../components/PageTable";
import { Card, Button, Input, Tag, Select, Space } from "../components/ui";
import ConfirmDialog from "../components/ConfirmDialog";

const DatePicker = ({ placeholder, value, onChange, style }) => (
  <div style={{ display: "flex", gap: "8px", ...style }}>
    <input
      type="date"
      placeholder={placeholder?.[0] || "开始日期"}
      value={value?.[0] || ""}
      onChange={(e) => onChange([e.target.value, value?.[1] || ""])}
      style={{
        padding: "8px 12px",
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
        fontSize: "14px",
      }}
    />
    <input
      type="date"
      placeholder={placeholder?.[1] || "结束日期"}
      value={value?.[1] || ""}
      onChange={(e) => onChange([value?.[0] || "", e.target.value])}
      style={{
        padding: "8px 12px",
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
        fontSize: "14px",
      }}
    />
  </div>
);

const SearchIcon = () => <span>🔍</span>;

const ActivityList = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const statusOptions = [
    { label: "全部状态", value: "" },
    { label: "待审核", value: "pending" },
    { label: "已通过", value: "approved" },
    { label: "进行中", value: "ongoing" },
    { label: "已结束", value: "finished" },
    { label: "已拒绝", value: "rejected" },
    { label: "已取消", value: "cancelled" },
  ];

  const fetchActivityList = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: 替换为实际的API调用
      // const response = await axios.get('/api/activities', {
      //   params: {
      //     page: pagination.current,
      //     pageSize: pagination.pageSize,
      //     search: searchValue,
      //     status: statusFilter,
      //     startDate: dateRange[0],
      //     endDate: dateRange[1],
      //   },
      // });
      // setTableData(response.data.list);
      // setPagination(prev => ({ ...prev, total: response.data.total }));

      // 模拟数据
      setTimeout(() => {
        let mockData = Array.from(
          { length: pagination.pageSize },
          (_, index) => {
            const statuses = [
              "pending",
              "approved",
              "ongoing",
              "finished",
              "rejected",
              "cancelled",
            ];
            const status =
              statuses[Math.floor(Math.random() * statuses.length)];

            return {
              id: (pagination.current - 1) * pagination.pageSize + index + 1,
              title: `环保活动${
                (pagination.current - 1) * pagination.pageSize + index + 1
              }`,
              organizer: `绿色环保队${index + 1}`,
              startTime: "2024-01-20 09:00:00",
              endTime: "2024-01-20 17:00:00",
              location: `活动地点${index + 1}`,
              maxParticipants: Math.floor(Math.random() * 100) + 50,
              currentParticipants: Math.floor(Math.random() * 80) + 20,
              status: status,
              createTime: "2024-01-15 10:30:00",
              description: "这是一个关于环保的活动，旨在提高大家的环保意识。",
            };
          }
        );

        // 根据搜索条件筛选数据
        if (searchValue) {
          mockData = mockData.filter(
            (item) =>
              item.title.includes(searchValue) ||
              item.organizer.includes(searchValue)
          );
        }

        if (statusFilter) {
          mockData = mockData.filter((item) => item.status === statusFilter);
        }

        if (dateRange[0] && dateRange[1]) {
          mockData = mockData.filter((item) => {
            const itemDate = item.startTime.split(" ")[0];
            return itemDate >= dateRange[0] && itemDate <= dateRange[1];
          });
        }

        setTableData(mockData);
        setPagination((prev) => ({ ...prev, total: 234 }));
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("获取活动列表失败:", error);
      alert("获取活动列表失败");
      setLoading(false);
    }
  }, [
    searchValue,
    statusFilter,
    dateRange,
    pagination.current,
    pagination.pageSize,
  ]);

  useEffect(() => {
    fetchActivityList();
  }, [fetchActivityList]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchActivityList();
  };

  const handleReset = () => {
    setSearchValue("");
    setStatusFilter("");
    setDateRange([]);
    setPagination((prev) => ({ ...prev, current: 1 }));
    setTimeout(() => {
      fetchActivityList();
    }, 100);
  };

  const handlePageChange = (pageInfo) => {
    setPagination((prev) => ({
      ...prev,
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
    }));
  };

  const handleApprove = (record) => {
    setSelectedActivity(record);
    setConfirmAction("approve");
    setConfirmVisible(true);
  };

  const handleReject = (record) => {
    setSelectedActivity(record);
    setConfirmAction("reject");
    setConfirmVisible(true);
  };

  const confirmApprove = () => {
    if (selectedActivity) {
      // 这里应该调用实际的审核API
      console.log('审核通过活动:', selectedActivity.id);
      
      setTableData(prevData => 
        prevData.map(item => 
          item.id === selectedActivity.id 
            ? { ...item, status: 'approved' }
            : item
        )
      );
      setConfirmVisible(false);
      setSelectedActivity(null);
      setConfirmAction(null);
    }
  };

  const confirmReject = () => {
    if (selectedActivity) {
      // 这里应该调用实际的拒绝API
      console.log('拒绝活动:', selectedActivity.id);
      
      setTableData(prevData => 
        prevData.map(item => 
          item.id === selectedActivity.id 
            ? { ...item, status: 'rejected' }
            : item
        )
      );
      setConfirmVisible(false);
      setSelectedActivity(null);
      setConfirmAction(null);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      pending: { color: "warning", text: "待审核" },
      approved: { color: "success", text: "已通过" },
      ongoing: { color: "primary", text: "进行中" },
      finished: { color: "default", text: "已结束" },
      rejected: { color: "danger", text: "已拒绝" },
      cancelled: { color: "danger", text: "已取消" },
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
      colKey: "title",
      title: "活动标题",
      width: 200,
    },
    {
      colKey: "organizer",
      title: "主办方",
      width: 150,
    },
    {
      colKey: "startTime",
      title: "开始时间",
      width: 160,
    },
    {
      colKey: "location",
      title: "活动地点",
      width: 120,
    },
    {
      colKey: "participants",
      title: "报名情况",
      width: 120,
      cell: ({ row }) => `${row.currentParticipants}/${row.maxParticipants}`,
    },
    {
      colKey: "status",
      title: "状态",
      width: 100,
      cell: ({ row }) => getStatusTag(row.status),
    },
    {
      colKey: "createTime",
      title: "创建时间",
      width: 160,
    },
    {
      colKey: "operation",
      title: "操作",
      width: 150,
      cell: ({ row }) => (
        <Space>
          {row.status === "pending" && (
            <>
              <Button
                theme="success"
                size="small"
                onClick={() => handleApprove(row)}
              >
                通过
              </Button>
              <Button
                theme="danger"
                size="small"
                onClick={() => handleReject(row)}
              >
                拒绝
              </Button>
            </>
          )}
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
              placeholder="搜索活动标题或主办方"
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
            <DatePicker
              mode="date"
              range
              placeholder={["开始日期", "结束日期"]}
              value={dateRange}
              onChange={setDateRange}
              style={{ width: "280px" }}
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
          onPaginationChange={handlePageChange}
        />
      </Card>

      <ConfirmDialog
        visible={confirmVisible}
        title={confirmAction === "approve" ? "确认通过" : "确认拒绝"}
        content={`确定要${confirmAction === "approve" ? "通过" : "拒绝"}活动「${
          selectedActivity?.title
        }」吗？`}
        onConfirm={confirmAction === "approve" ? confirmApprove : confirmReject}
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedActivity(null);
          setConfirmAction(null);
        }}
      />
    </div>
  );
};

export default ActivityList;
