'use client';

import { Form, Input, Button, Select, Modal } from 'antd';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { TransactionCategories, UpdateCategories } from '@/models/transaction-categories-modal/transaction-categories.modal';
import { TRANSACTION_CATEGORIES_SERVICE } from '@/service/transaction-categories/transaction-categories-service';

const { Option } = Select;

interface UpdateCategoryFormProps {
    isVisible: boolean;
    onCancel: () => void;
    onSearch: () => void;
    editingItem: TransactionCategories;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
    isVisible,
    onCancel,
    onSearch,
    editingItem
}) => {
    const [form] = Form.useForm();
    const t = useTranslations('Categories');

    useEffect(() => {
        if (editingItem) {
            form.setFieldsValue({
                cate_name: editingItem.cate_name,
                cate_type: editingItem.cate_type,
                cate_note: editingItem.cate_note,
            });
        }
    }, [editingItem, form]);

    const handleSubmit = async (values: any) => {
        const { cate_name, cate_type, cate_note } = values;

        try {
            const payload: UpdateCategories = {
                cate_name,
                cate_type,
                cate_note,
            };

            await TRANSACTION_CATEGORIES_SERVICE.updateItem(editingItem._id ?? '', payload);
            toast.success(t('transactionUpdatedSuccess'));

            form.resetFields();
            onCancel();
            onSearch();
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error(t('transactionUpdateError'));
        }
    };

    return (
        <Modal
            title={t('editCategory')}
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
                        {t('updateCategory')}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateCategoryForm;