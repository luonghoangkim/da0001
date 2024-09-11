'use client';

import { Table, Tabs, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../authenticated-layout';
import TransactionForm from './transaction-form'; // Import form

const { TabPane } = Tabs;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TransactionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]); // State để lưu giao dịch
  const [loading, setLoading] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm fetch dữ liệu giao dịch từ API
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/transaction`); // Thay bằng endpoint API của bạn
      const data = await response.json();
      setTransactions(data.transactions); // Cập nhật state với dữ liệu giao dịch
      setLoading(false); // Ngừng hiển thị trạng thái loading
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchTransactions();
  }, []);


  const columns = [
    {
      title: 'Items',
      dataIndex: 'item',
      key: 'item',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <img src={record.icon} alt={text} className="w-6 h-6 mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <span className="font-bold">${text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span className="font-bold">{text}</span>,
    },
  ];

  return (
    <AuthenticatedLayout>
      <div className="p-4 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transaction</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add Transaction
          </Button>
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="All" key="1">
            <Table columns={columns} dataSource={transactions} pagination={false} loading={loading} />
          </TabPane>
          <TabPane tab="Revenue" key="2">
            {/* Thêm bảng dữ liệu cho Revenue nếu cần */}
          </TabPane>
          <TabPane tab="Expenses" key="3">
            {/* Thêm bảng dữ liệu cho Expenses nếu cần */}
          </TabPane>
        </Tabs>


        {/* Gọi modal form và truyền props */}
        <TransactionForm isVisible={isModalVisible} onCancel={handleCancel} />
      </div>
    </AuthenticatedLayout>
  );
};

export default TransactionPage;
