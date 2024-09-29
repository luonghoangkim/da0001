'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tabs, Button, Pagination, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import TabPane from 'antd/es/tabs/TabPane';
import { APP_FORMATTERS } from "@/utils";
import TransactionForm from '../transaction/transaction-add-form';
import UpdateTransactionForm from '../transaction/transaction-edit-form';
import { TRANSACTION_SERVICE } from '@/service/transaction/transaction-service';
import { SearchTransaction, Transaction, TransactionData } from '@/models/trans-modal/trans.modal';
import { toast } from 'react-toastify';

const TransactionPage = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<TransactionData[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [activeTab, setActiveTab] = useState('1');
    const [editingItem, setEditingItem] = useState<TransactionData | null>(null);
    const t = useTranslations('Transaction');
    const commonLanguage = useTranslations('CommonLanguage');

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const showUpdateModal = (item: TransactionData) => {
        setEditingItem(item);
        setIsUpdateModalVisible(true);
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
        setEditingItem(null);
    };

    const fetchTransactions = async (page: number, limit: number, trans_type?: string) => {
        try {
            setLoading(true);
            setData([]);
            const payload: SearchTransaction = {
                page,
                limit,
                trans_type
            };
            const response = await TRANSACTION_SERVICE.searchData(payload);

            if (response && response.data) {
                setData(response.data);
                setTotal(response.data.total);
            } else {
                console.error('Data format is not as expected:', response);
                setData([]);
            }
            setLoading(false);
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error(commonLanguage('errorOccurred'));
            }
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const type = getTransTypeFromTab(activeTab);
        fetchTransactions(currentPage, pageSize, type);
    }, [currentPage, pageSize, activeTab]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (current: number, limit: number) => {
        setPageSize(limit);
        setCurrentPage(1);
    };

    const handleDelete = async (_id: string) => {
        try {
            await TRANSACTION_SERVICE.deleteItem(_id ?? "");
            toast.success(t('deleteSuccess'));
            fetchTransactions(currentPage, pageSize, getTransTypeFromTab(activeTab));
        } catch (error) {
            toast.error(t('deleteFailed'));
            console.error('Error deleting transaction:', error);
        }
    };

    const getTransTypeFromTab = (tab: string) => {
        switch (tab) {
            case '2': return 'TT002';
            case '3': return 'TT001';
            default: return undefined;
        }
    };

    const columns = [
        {
            title: t('actions'),
            key: 'actions',
            width: 150,
            render: (_: any, record: TransactionData) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showUpdateModal(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title={commonLanguage('deleteConfirmation')}
                        onConfirm={() => handleDelete(record._id ?? "")}
                        okText={commonLanguage('yes')}
                        cancelText={commonLanguage('no')}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </span>
            ),
        },
        {
            title: t('category'),
            dataIndex: ['category_id', 'cate_name'],
            key: 'category_name',
        },
        {
            title: t('date'),
            dataIndex: 'trans_date',
            key: 'trans_date',
            render: (text: string) => <span className="justify-center items-center font-bold">{APP_FORMATTERS.formatDate(text, "DD/MM/YYYY")}</span>,
        },
        {
            title: t('amount'),
            dataIndex: 'trans_amount',
            key: 'trans_amount',
            render: (text: string) => <span className="font-bold">{APP_FORMATTERS.formatCurrency(Number(text))}</span>,
        },
        {
            title: t('cardId'),
            dataIndex: ['card_id', 'card_number'],
            key: 'card_id',
            render: (text: number) => <span className="justify-center items-center">{APP_FORMATTERS.formatCardNumber(text)}</span>,
        },
        {
            title: t('description'),
            dataIndex: 'trans_note',
            key: 'trans_note',
        },
    ];

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('recentTransaction')}</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                    {t('addTransaction')}
                </Button>
            </div>
            <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
                <TabPane tab={t('all')} key="1">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        loading={isLoading}
                        rowKey="_id"
                    />
                </TabPane>
                <TabPane tab={t('expenses')} key="3">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        loading={isLoading}
                        rowKey="_id"
                    />
                </TabPane>
                <TabPane tab={t('revenue')} key="2">
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        loading={isLoading}
                        rowKey="_id"
                    />
                </TabPane>
            </Tabs>
            {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
            /> */}

            <TransactionForm
                isVisible={isAddModalVisible}
                onCancel={handleAddCancel}
                onSearch={() => fetchTransactions(currentPage, pageSize, getTransTypeFromTab(activeTab))}
            />

            {editingItem && (
                <UpdateTransactionForm
                    isVisible={isUpdateModalVisible}
                    onCancel={handleUpdateCancel}
                    onSearch={() => fetchTransactions(currentPage, pageSize, getTransTypeFromTab(activeTab))}
                    editingItem={editingItem}
                />
            )}
        </div>
    );
};

export default TransactionPage;