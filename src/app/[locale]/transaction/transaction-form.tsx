'use client';

import { useState } from 'react';
import { Tabs, Form, Input, Button, DatePicker, Select, Modal, InputNumber } from 'antd';
import React from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { createTransaction } from './service/transaction-service';
import { toast } from 'react-toastify';
import CartSelectedComponent from '../components/cart-selected-component';
import { useTranslations } from 'next-intl';

const { Option } = Select;

const TransactionForm = ({ isVisible, onCancel, onSearch }: { isVisible: boolean, onCancel: () => void, onSearch: () => void }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('expense');
    const t = useTranslations('Transaction');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            amount: values.amount,
            description: values.note || '',
            category_name: values.expenseCategory || '',
            card_id: values.bankCard,
            type: activeTab,
            status: 'pending',
        };

        try {
            await createTransaction(payload);
            toast.success(t('transactionAddedSuccess'));
            form.resetFields();
            onCancel();
            onSearch();
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error(t('transactionAddError'));
        }
    };

    return (
        <Modal
            title={t('addNewTransaction')}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab={t('expense')} key="expense">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="date"
                            label={t('transactionDate')}
                            rules={[{ required: true, message: t('pleaseSelectDate') }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label={t('expenseAmount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} placeholder={t('enterExpenseAmount')} />
                        </Form.Item>

                        <CartSelectedComponent />

                        <Form.Item
                            name="expenseCategory"
                            label={t('expenseCategory')}
                        >
                            <Select placeholder={t('selectExpenseCategory')}>
                                <Option value="Ăn uống">{t('food')}</Option>
                                <Option value="Quần áo">{t('clothes')}</Option>
                                <Option value="Mua sắm">{t('shopping')}</Option>
                                <Option value="Trả lãi">{t('interest')}</Option>
                                <Option value="Đầu tư">{t('investment')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label={t('note')}
                        >
                            <Input.TextArea placeholder={t('addOptionalNote')} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                {t('addTransaction')}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab={t('income')} key="income">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="date"
                            label={t('transactionDate')}
                            rules={[{ required: true, message: t('pleaseSelectDate') }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label={t('incomeAmount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} placeholder={t('enterIncomeAmount')} />
                        </Form.Item>

                        <CartSelectedComponent />

                        <Form.Item
                            name="expenseCategory"
                            label={t('incomeCategory')}
                        >
                            <Select placeholder={t('selectIncomeCategory')}>
                                <Option value="Lương">{t('salary')}</Option>
                                <Option value="Tiền Phụ Cấp">{t('allowance')}</Option>
                                <Option value="Tiền Thưởng">{t('bonus')}</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label={t('note')}
                        >
                            <Input.TextArea placeholder={t('addOptionalNote')} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                {t('addTransaction')}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default TransactionForm;