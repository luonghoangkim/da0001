'use client';

import { useState } from 'react';
import { Tabs, Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import React from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { createTransaction } from './service/transaction-service';
import { toast } from 'react-toastify';
import CartSelectedComponent from '../components/cart-selected-component';

const { Option } = Select;

const TransactionForm = ({ isVisible, onCancel, onSearch }: { isVisible: boolean, onCancel: () => void, onSearch: () => void }) => {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState('expense');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            amount: values.amount,
            description: values.note || '',
            category_name: values.expenseCategory || '',
            card_id: values.bankCard,
            type: activeTab, // 'income' hoặc 'expense' dựa trên tab đang active
            status: 'pending',
        };

        try {
            await createTransaction(payload);
            toast.success('Giao dịch đã được thêm thành công!');
            form.resetFields(); // Reset form sau khi thêm thành công
            onCancel(); // Đóng modal sau khi gửi thành công
            onSearch();
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error('Có lỗi xảy ra khi thêm giao dịch.');
        }
    };

    return (
        <Modal
            title="Thêm Giao Dịch Mới"
            open={isVisible}
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

                        <CartSelectedComponent />

                        <Form.Item
                            name="expenseCategory"
                            label="Loại chi tiêu"
                        >
                            <Select placeholder="Chọn loại chi tiêu">
                                <Option value="Ăn uống">Ăn uống</Option>
                                <Option value="Quần áo">Quần áo</Option>
                                <Option value="Mua sắm">Mua sắm</Option>
                                <Option value="Trả lãi">Trả lãi</Option>
                                <Option value="Đầu tư">Đầu tư</Option>
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

                        <CartSelectedComponent />

                        <Form.Item
                            name="expenseCategory"
                            label="Loại thu nhập"
                        >
                            <Select placeholder="Chọn loại thu nhập">
                                <Option value="Lương">Lương</Option>
                                <Option value="Tiền Phụ Cấp">Tiền Phụ Cấp</Option>
                                <Option value="Tiền Thưởng">Tiền Thưởng</Option>
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
            </Tabs>
        </Modal>
    );
};

export default TransactionForm;
