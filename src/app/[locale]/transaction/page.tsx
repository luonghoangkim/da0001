'use client';

import { Table, Tabs, Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../authenticated-layout';
import TransactionForm from './transaction-form';
import { getTransaction } from './service/transaction-service';
import { Transaction } from 'mongodb';
import { formatDate, formatCurrency } from "@/utils";
import { useTranslations } from 'next-intl';



const { TabPane } = Tabs;

const TransactionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0); // Tổng số bản ghi
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng bản ghi mỗi trang
  const [activeTab, setActiveTab] = useState('1'); // Tab hiện tại
  const t = useTranslations('Transaction');


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchTransactions = async (page: number, size: number, type?: string) => {
    try {
      setLoading(true);
      const response = await getTransaction(page, size, type);
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
    const type = activeTab === '2' ? 'income' : activeTab === '3' ? 'expense' : undefined;
    fetchTransactions(currentPage, pageSize, type);
  }, [currentPage, pageSize, activeTab]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset trang khi thay đổi kích thước trang
  };

  const columns = [
    {
      title: `${t('category')}`,
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: `${t('date')}`,
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => <span className="justify-center items-center font-bold">{formatDate(text)}</span>,
    },
    {
      title: `${t('type')}`,
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: `${t('amount')}`,
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <span className="font-bold">{formatCurrency(Number(text))}</span>,
    },
    {
      title: `${t('decription')}`,
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <span className="font-bold">{text}</span>,
    },
  ];

  return (
    <AuthenticatedLayout>
      <div className="p-4 bg-white rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('recentTransaction')}</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            {t('addTransaction')}
          </Button>
        </div>
        <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
          <TabPane tab={t('all')} key="1">
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
              pageSizeOptions={['10', '20', '50']}
            />
          </TabPane>
          <TabPane tab={t('revenue')} key="2">
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
              pageSizeOptions={['10', '20', '50']}
            />
          </TabPane>
          <TabPane tab={t('expenses')} key="3">
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
              pageSizeOptions={['10', '20', '50']}
            />
          </TabPane>
        </Tabs>

        {/* Gọi modal form và truyền props */}
        <TransactionForm isVisible={isModalVisible} onCancel={handleCancel} onSearch={() => fetchTransactions(currentPage, pageSize, activeTab === '2' ? 'income' : activeTab === '3' ? 'expense' : undefined)} />
      </div>
    </AuthenticatedLayout>
  );
};

export default TransactionPage;
