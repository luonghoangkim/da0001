import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Modal, InputNumber, Tabs } from 'antd';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import moment from 'moment';
import TabPane from 'antd/es/tabs/TabPane';
import CardSelectedComponent from './card-selected-component';
import CategoriesSelectedComponent from './categories-selected-component';
import { TRANSACTION_SERVICE } from '@/service/transaction/transaction-service';
import { Transaction, TransactionData } from '@/models/trans-modal/trans.modal';

interface UpdateTransactionFormProps {
    isVisible: boolean;
    onCancel: () => void;
    onSearch: () => void;
    editingItem: TransactionData;
}

const UpdateTransactionForm: React.FC<UpdateTransactionFormProps> = ({
    isVisible,
    onCancel,
    onSearch,
    editingItem
}) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('expense');
    const t = useTranslations('Transaction');
    const commonLanguage = useTranslations('CommonLanguage');

    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue({
                trans_date: moment(editingItem.trans_date),
                trans_amount: editingItem.trans_amount,
                category_id: editingItem.category_id._id ?? "",
                card_id: editingItem.card_id._id ?? "",
                trans_note: editingItem.trans_note,
            });
            setActiveTab(editingItem.trans_type === 'TT001' ? 'expense' : 'income');
        }
    }, [editingItem, form]);

    const handleSubmit = async (values: any) => {
        try {
            const payload: Transaction = {
                ...values,
                trans_type: activeTab === 'expense' ? 'TT001' : 'TT002'
            };

            await TRANSACTION_SERVICE.updateItem(editingItem._id ?? '', payload);
            toast.success(commonLanguage('updateSucces'));
            form.resetFields();
            onCancel();
            onSearch();
        } catch (error) {
            console.error('Error updating transaction:', error);
            toast.error(commonLanguage('updateError'));
        }
    };

    return (
        <Modal
            title={t('editTransaction')}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
            >
                <TabPane
                    tab={t('expense')}
                    key="expense"
                    disabled={editingItem?.trans_type !== 'TT001'}
                >
                    <Form
                        form={form}
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

                        <CategoriesSelectedComponent cate_type="DM001" />

                        <Form.Item
                            name="trans_note"
                            label={t('note')}
                        >
                            <Input.TextArea placeholder={t('addOptionalNote')} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                {commonLanguage('save')}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane
                    tab={t('income')}
                    key="income"
                    disabled={editingItem?.trans_type !== 'TT002'}
                >
                    <Form
                        form={form}
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

                        <CategoriesSelectedComponent cate_type="DM002" />

                        <Form.Item
                            name="trans_note"
                            label={t('note')}
                        >
                            <Input.TextArea placeholder={t('addOptionalNote')} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                {commonLanguage('save')}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default UpdateTransactionForm;