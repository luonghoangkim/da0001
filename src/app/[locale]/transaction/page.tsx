'use client';

import { Table, Tabs, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AuthenticatedLayout from '../authenticated-layout';
import TransactionForm from './transaction-form'; // Import form

const { TabPane } = Tabs;

const TransactionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      title: 'Shop Name',
      dataIndex: 'shop',
      key: 'shop',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <span className="font-bold">${text}</span>,
    },
  ];

  const data = [
    {
      key: '1',
      item: 'GTR 5',
      shop: 'Gadget & Gear',
      date: '17 May, 2023',
      payment: 'Credit Card',
      amount: '160.00',
      icon: '/icons/gadget.svg',
    },
    {
      key: '2',
      item: 'Polo shirt',
      shop: 'XL fashions',
      date: '17 May, 2023',
      payment: 'Credit Card',
      amount: '20.00',
      icon: '/icons/shirt.svg',
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
            <Table columns={columns} dataSource={data} pagination={false} />
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
