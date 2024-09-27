"use client";
import React, { useState, useEffect } from "react";
import { Button, Pagination, Table, Tabs, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslations } from 'next-intl';
import TabPane from "antd/es/tabs/TabPane";
import TransactionCategoriesForm from "./transaction-categories-add-form";
import { APP_FORMATTERS } from "@/utils";
import { SearchCategories, TransactionCategories, UpdateCategories } from "@/models/transaction-categories-modal/transaction-categories.modal";
import { TRANSACTION_CATEGORIES_SERVICE } from "@/service/transaction-categories/transaction-categories-service";
import { toast } from 'react-toastify';
import AddCategoryForm from "./transaction-categories-add-form";
import UpdateCategoryForm from "./transaction-categories-edit-form";

const CategoriesPage = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<TransactionCategories[]>([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [activeTab, setActiveTab] = useState('1');
    const [editingItem, setEditingItem] = useState<TransactionCategories | null>(null);
    const t = useTranslations('Categories');
    const commonLanguage = useTranslations('CommonLanguage');

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const showUpdateModal = (item: TransactionCategories) => {
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


    const fetchTransactions = async (page: number, limit: number, cate_type?: string) => {
        try {
            setLoading(true);
            setData([]);
            const payload: SearchCategories = {
                page,
                limit,
                cate_type
            };
            const response = await TRANSACTION_CATEGORIES_SERVICE.searchData(payload);

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
            if (status == 500) {
                toast.error(commonLanguage('errorOccurred'));
            }
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const type = activeTab === '2' ? 'DM002' : activeTab === '3' ? 'DM001' : activeTab === '4' ? 'DM003' : undefined;
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
            await TRANSACTION_CATEGORIES_SERVICE.deleteItem(_id ?? "");
            toast.success(t('deleteSuccess'));
            fetchTransactions(currentPage, pageSize, getCateTypeFromTab(activeTab));
        } catch (error) {
            toast.error(t('deleteFailed'));
            console.error('Error deleting category:', error);
        }
    };

    const getCateTypeFromTab = (tab: string) => {
        switch (tab) {
            case '2': return 'DM002';
            case '3': return 'DM001';
            case '4': return 'DM003';
            default: return undefined;
        }
    };

    const columns = [
        {
            title: t('actions'),
            key: 'actions',
            width: 150,
            render: (_: any, record: TransactionCategories) => (
                <span>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showUpdateModal(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title={t('deleteConfirmation')}
                        onConfirm={() => handleDelete(record._id ?? "")}
                        okText={t('yes')}
                        cancelText={t('no')}
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </span>
            ),
        },
        {
            title: t('categoryName'),
            dataIndex: 'cate_name',
            key: 'cate_name',
        },
        {
            title: t('createdDate'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span className="justify-center items-center font-bold">{APP_FORMATTERS.formatDate(text)}</span>,
        },
        {
            title: t('description'),
            dataIndex: 'description',
            key: 'description',
        },

    ];

    const renderTable = () => (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={isLoading}
                rowKey="id"
            />
            {/* <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
            /> */}
        </>
    );

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('categoriesManagement')}</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showAddModal()}>
                    {t('addCategories')}
                </Button>
            </div>
            <Tabs defaultActiveKey="1" onChange={(key) => setActiveTab(key)}>
                <TabPane tab={t('all')} key="1">
                    {renderTable()}
                </TabPane>
                <TabPane tab={t('expenses')} key="3">
                    {renderTable()}
                </TabPane>
                <TabPane tab={t('revenue')} key="2">
                    {renderTable()}
                </TabPane>
                <TabPane tab={t('goals')} key="4">
                    {renderTable()}
                </TabPane>
            </Tabs>

            <AddCategoryForm
                isVisible={isAddModalVisible}
                onCancel={handleAddCancel}
                onSearch={() => fetchTransactions(currentPage, pageSize, getCateTypeFromTab(activeTab))}
            />

            {editingItem && (
                <UpdateCategoryForm
                    isVisible={isUpdateModalVisible}
                    onCancel={handleUpdateCancel}
                    onSearch={() => fetchTransactions(currentPage, pageSize, getCateTypeFromTab(activeTab))}
                    editingItem={editingItem}
                />
            )}
        </div>
    );
};

export default CategoriesPage;