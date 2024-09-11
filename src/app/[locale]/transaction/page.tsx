'use client';

import { Table, Tabs, Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../authenticated-layout';
import TransactionForm from './transaction-form';
import { getTransaction } from './service/transaction-service';
import { Transaction } from 'mongodb';

const { TabPane } = Tabs;

const TransactionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0); // Tổng số bản ghi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi mỗi trang

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchTransactions = async (page: number, size: number) => {
    try {
      const response = await getTransaction(page, size);
      console.log('Fetched data:', response);

      if (response && response.transactions) {
        setData(response.transactions);
        setTotal(response.total); // Cập nhật tổng số bản ghi
      } else {
        console.error('Data format is not as expected:', response);
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  // Gọi API khi component được render lần đầu hoặc khi trang hoặc kích thước trang thay đổi
  useEffect(() => {
    fetchTransactions(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset trang khi thay đổi kích thước trang
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
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={loading}
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageSizeChange}
              pageSizeOptions={['10']}
            />
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
