"use client";
import React, { useState } from "react";
import { Card, Typography, Button, Space, Modal, Input, Form } from "antd";
import AuthenticatedLayout from "../authenticated-layout";
import { PlusOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface CreditCardProps {
    bankName: string;
    accountNumber: string;
    totalAmount: number;
    onRemove: () => void;
}

const CreditCardComponent: React.FC<CreditCardProps> = ({ bankName, accountNumber, totalAmount, onRemove }) => (
    <Card style={{ width: 350, marginBottom: 16, height: 260 }} >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Space
                align="baseline"
                style={{ width: "100%", justifyContent: "space-between" }}
            >
                <Text strong>{bankName}</Text>
            </Space>
            <Text type="secondary">Account Number</Text>
            <Title level={4} style={{ margin: 0 }}>
                {accountNumber}
            </Title>
            <Text type="secondary">Total amount</Text>
            <Title level={3} style={{ margin: "4px 0" }}>
                ${totalAmount}
            </Title>
            <Space
                style={{ width: "100%", justifyContent: "flex-end", marginTop: 8 }}
            >
                <Button type="text" style={{ padding: 0, color: "#52c41a" }} onClick={onRemove}>
                    Remove
                </Button>
            </Space>
        </Space>
    </Card>
);

const fakeCardData = [
    {
        id: 1,
        bankName: "Vietcombank",
        accountNumber: "3388 4556 8860 8***",
        totalAmount: 25000
    },
    {
        id: 2,
        bankName: "Techcombank",
        accountNumber: "4567 7890 1234 5***",
        totalAmount: 30000
    },
    {
        id: 3,
        bankName: "BIDV",
        accountNumber: "9876 5432 1098 7***",
        totalAmount: 20000
    }
];

const CreditCardPage = () => {
    const [cards, setCards] = React.useState(fakeCardData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleRemove = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const showAddCardModal = () => {
        setIsModalVisible(true);
    };

    const handleAddCard = (values: any) => {
        const newCard = {
            id: cards.length + 1,
            bankName: values.bankName,
            accountNumber: values.accountNumber,
            totalAmount: 0,  // Bạn có thể thay đổi giá trị mặc định nếu cần
        };
        setCards([...cards, newCard]);
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-wrap bg-gray-100 justify-start gap-4">
                {cards.map(card => (
                    <CreditCardComponent
                        key={card.id}
                        bankName={card.bankName}
                        accountNumber={card.accountNumber}
                        totalAmount={card.totalAmount}
                        onRemove={() => handleRemove(card.id)}
                    />
                ))}
                <Card
                    style={{
                        width: 350,
                        height: 260,
                        marginBottom: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    bodyStyle={{ padding: 16 }}
                    onClick={showAddCardModal}
                >
                    <PlusOutlined style={{ fontSize: 24 }} />
                </Card>
            </div>
            <Modal
                title="Thêm Thẻ Mới"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddCard}>
                    <Form.Item
                        name="bankName"
                        label="Tên Ngân Hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="accountNumber"
                        label="Số Thẻ"
                        rules={[{ required: true, message: 'Vui lòng nhập số thẻ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default CreditCardPage;
