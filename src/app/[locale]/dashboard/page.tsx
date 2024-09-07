"use client";
import {
  Card,
  Col,
  Row,
  Statistic,
  Progress,
  List,
  Divider,
  Table,
} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AuthenticatedLayout from "../authenticated-layout";

const DashboardPage = () => {
  const data = [
    {
      name: "GTR 5",
      type: "Gadget & Gear",
      price: "$160.00",
      date: "17 May 2023",
    },
    {
      name: "Polo Shirt",
      type: "XL fashions",
      price: "$20.00",
      date: "17 May 2023",
    },
    {
      name: "Biriyani",
      type: "Hajir Biryani",
      price: "$10.00",
      date: "17 May 2023",
    },
    { name: "Taxi Fare", type: "Uber", price: "$12.00", date: "17 May 2023" },
    {
      name: "Keyboard",
      type: "Gadget & Gear",
      price: "$22.00",
      date: "17 May 2023",
    },
  ];

  const columns = [
    { title: "Item", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "type", key: "type" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const weeklyData = [
    { name: "17 Sun", thisWeek: 250, lastWeek: 0 },
    { name: "18 Mon", thisWeek: 50, lastWeek: 20 },
    { name: "19 Tue", thisWeek: 10, lastWeek: 50 },
    { name: "20 Wed", thisWeek: 70, lastWeek: 60 },
    { name: "21 Thu", thisWeek: 60, lastWeek: 0 },
    { name: "22 Fri", thisWeek: 230, lastWeek: 20 },
    { name: "23 Sat", thisWeek: 60, lastWeek: 20 },
  ];

  return (
    <AuthenticatedLayout>
      <div style={{ padding: "24px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Total Balance" bordered={false}>
              <Statistic title="All Accounts" value={240399} precision={2} />
              <Divider style={{ margin: "10px 0" }} />
              <Statistic title="Credit Card" value={25000} precision={2} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Goals" bordered={false}>
              <Statistic title="Target Achieved" value={12500} precision={2} />
              <Progress percent={60} />
              <Statistic
                title="This month Target"
                value={20000}
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Upcoming Bill" bordered={false}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  {
                    title: "Figma - Monthly",
                    date: "15 May 2023",
                    amount: "$150",
                  },
                  {
                    title: "Adobe - Yearly",
                    date: "16 Jun 2023",
                    amount: "$559",
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={`Last Charge: ${item.date}`}
                    />
                    <div>{item.amount}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "24px" }}>
          <Col xs={24} lg={12}>
            <Card title="Recent Transactions" bordered={false}>
              <Table dataSource={data} columns={columns} pagination={false} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Statistics">
              <ResponsiveContainer width="100%" height={330}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="thisWeek" stroke="#8884d8" />
                  <Line type="monotone" dataKey="lastWeek" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "24px" }}>
          <Col xs={24}>
            <Card title="Expenses Breakdown" bordered={false}>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={[
                  { title: "Housing", amount: "$250.00", percentage: "15%" },
                  { title: "Food", amount: "$350.00", percentage: "8%" },
                  {
                    title: "Transportation",
                    amount: "$50.00",
                    percentage: "12%",
                  },
                  { title: "Shopping", amount: "$420.00", percentage: "25%" },
                  { title: "Others", amount: "$650.00", percentage: "23%" },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Card title={item.title}>
                      <Statistic value={item.amount} />
                      <div>{item.percentage}</div>
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardPage;
