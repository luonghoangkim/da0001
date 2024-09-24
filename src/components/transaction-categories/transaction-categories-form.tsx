'use client';

import { Form, Input, Button, Select, Modal } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { TransactionCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
import { TRANSACTION_CATEGORIES_SERVICE } from '@/service/transaction-categories/transaction-categories-service';

const { Option } = Select;

const TransactionCategoriesForm = ({ isVisible, onCancel, onSearch }: { isVisible: boolean, onCancel: () => void, onSearch: () => void }) => {
    const [form] = Form.useForm();
    const t = useTranslations('Categories');

    const handleSubmit = async (values: any) => {

        const { cate_name, cate_type, cate_note } = values;

        try {
            const payload: TransactionCategories = { cate_name, cate_type, cate_note };
            const res = await TRANSACTION_CATEGORIES_SERVICE.create(payload);
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
            title={t('addCategories')}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >

                <Form.Item
                    name="cate_name"
                    label={t('categoryName')}
                    rules={[{ required: true, message: t('pleaseEnterName') }]}
                >
                    <Input min={0} style={{ width: '100%' }} placeholder={t('enterNameCate')} />
                </Form.Item>

                <Form.Item
                    name="cate_type"
                    label={t('categoryType')}
                    rules={[{ required: true, message: t('pleaseSelectCate') }]}
                >
                    <Select placeholder={t('selectTypeCategory')}>
                        <Option value="DM001">{t('expense')}</Option>
                        <Option value="DM002">{t('income')}</Option>
                        <Option value="DM003">{t('saving')}</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="cate_note"
                    label={t('note')}
                >
                    <Input.TextArea placeholder={t('addOptionalNote')} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        {t('addCategories')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TransactionCategoriesForm;