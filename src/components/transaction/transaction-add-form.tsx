'use client';

import { useState } from 'react';
import { Tabs, Form, Input, Button, DatePicker, Modal, InputNumber } from 'antd';
import React from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { toast } from 'react-toastify';
import CardSelectedComponent from './card-selected-component';
import { useTranslations } from 'next-intl';
import CategoriesSelectedComponent from './categories-selected-component';
import { TRANSACTION_SERVICE } from '@/service/transaction/transaction-service';
import { Transaction } from '@/models/trans-modal/trans.modal';

interface TransactionFormProps {
    isVisible: boolean;
    onCancel: () => void;
    onSearch: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isVisible, onCancel, onSearch }) => {
    const [expenseForm] = Form.useForm();
    const [incomeForm] = Form.useForm();
    const [activeTab, setActiveTab] = useState('expense');
    const t = useTranslations('Transaction');
    const commonLanguage = useTranslations('CommonLanguage');


    const handleTabChange = (key: any) => {
        setActiveTab(key);
        if (key === 'expense') {
            incomeForm.resetFields();
        } else {
            expenseForm.resetFields();
        }
    };

    const handleSubmit = async (values: Transaction) => {
        const payload = {
            ...values,
            trans_type: activeTab === 'expense' ? 'TT001' : 'TT002'
        };
        try {
            await TRANSACTION_SERVICE.create(payload);
            toast.success(commonLanguage('createSucces'));
            if (activeTab === 'expense') {
                expenseForm.resetFields();
            } else {
                incomeForm.resetFields();
            }
            onCancel();
            onSearch();
        } catch (error: any) {
            console.error('Error creating transaction:', error);
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    toast.error(t('insufficientBalance'));
                } else {
                    toast.error(commonLanguage('createError'));
                }

            }
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
                        form={expenseForm}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="trans_date"
                            label={t('transactionDate')}
                            rules={[{ required: true, message: t('pleaseSelectDate') }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="trans_amount"
                            label={t('expenseAmount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} placeholder={t('enterExpenseAmount')} />
                        </Form.Item>

                        <CardSelectedComponent />

                        <CategoriesSelectedComponent cate_type={"DM001"} />
                        <Form.Item
                            name="trans_note"
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
                        form={incomeForm}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="trans_date"
                            label={t('transactionDate')}
                            rules={[{ required: true, message: t('pleaseSelectDate') }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="trans_amount"
                            label={t('incomeAmount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} placeholder={t('enterIncomeAmount')} />
                        </Form.Item>

                        <CardSelectedComponent />
                        <CategoriesSelectedComponent cate_type={"DM002"} />
                        <Form.Item
                            name="trans_note"
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