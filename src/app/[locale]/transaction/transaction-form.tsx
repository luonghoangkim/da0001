'use client';

import { useState } from 'react';
import { Tabs, Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import React from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { createTransaction } from './service/transaction-service';
import { toast } from 'react-toastify';

const { Option } = Select;

const TransactionForm = ({ isVisible, onCancel }: { isVisible: boolean, onCancel: () => void }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('expense');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const handleSubmit = async (values: any) => {
        console.log("Form Values:", values);
        const payload = {
            amount: values.amount,
            description: values.note || '',
            category_name: values.expenseCategory || '',
            type: activeTab, // 'income' hoặc 'expense' dựa trên tab đang active
            status: 'pending',
        };

        try {
            await createTransaction(payload);
            toast.success('Giao dịch đã được thêm thành công!');
            form.resetFields(); // Reset form sau khi thêm thành công
            onCancel(); // Đóng modal sau khi gửi thành công
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error('Có lỗi xảy ra khi thêm giao dịch.');
        }
    };

    return (
        <Modal
            title="Thêm Giao Dịch Mới"
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={600} // Điều chỉnh kích thước modal
        >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Tiền Chi" key="expense">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="date"
                            label="Ngày giao dịch"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label="Số tiền chi"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                        >
                            <Input placeholder="Nhập số tiền chi" />
                        </Form.Item>

                        <Form.Item
                            name="bankCard"
                            label="Thẻ chi"
                        >
                            <Select placeholder="Chọn thẻ chi">
                                <Option value="creditCard">Thẻ tín dụng</Option>
                                <Option value="debitCard">Thẻ ghi nợ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="expenseCategory"
                            label="Loại chi tiêu"
                        >
                            <Select placeholder="Chọn loại chi tiêu">
                                <Option value="Food">Ăn uống</Option>
                                <Option value="Clothing">Quần áo</Option>
                                <Option value="Shopping">Mua sắm</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label="Ghi chú"
                        >
                            <Input.TextArea placeholder="Thêm ghi chú (tùy chọn)" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Thêm Giao Dịch
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Tiền Thu" key="income">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="date"
                            label="Ngày giao dịch"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                        >
                            <DatePicker className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="amount"
                            label="Số tiền thu"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                        >
                            <Input placeholder="Nhập số tiền thu" />
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label="Ghi chú"
                        >
                            <Input.TextArea placeholder="Thêm ghi chú (tùy chọn)" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full">
                                Thêm Giao Dịch
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default TransactionForm;
