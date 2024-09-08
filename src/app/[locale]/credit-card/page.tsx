"use client";
import React, { useState } from "react";
import { Card, Typography, Button, Space, Modal, Input, Form } from "antd";
import AuthenticatedLayout from "../authenticated-layout";
import { PlusOutlined, CreditCardOutlined, BankOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { createCreditCard } from "./service/credit-card-service";
import { useTranslations } from 'next-intl';


const { Text, Title } = Typography;

interface CreditCardProps {
    bankName: string;
    accountNumber: string;
    totalAmount: number;
    onRemove: () => void;
    onEdit: () => void;
}

const CreditCardComponent: React.FC<CreditCardProps> = ({ bankName, accountNumber, totalAmount, onRemove, onEdit }) => {
    const t = useTranslations('CreditCard');

    return (
        <Card style={{ width: 350, marginBottom: 10, height: 260 }} >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Space
                    align="baseline"
                    style={{ width: "100%", justifyContent: "space-between" }}
                >
                    <BankOutlined style={{ fontSize: '22px' }} />
                    <Text strong>{bankName}</Text>
                </Space>
                <Text type="secondary"> {t('cardNumber')}</Text>
                <Title level={4} style={{ margin: 0 }}>
                    <CreditCardOutlined style={{ paddingRight: "10px" }} /> {accountNumber}
                </Title>
                <Text type="secondary"> {t('totalAmount')}</Text>
                <Title level={3} style={{ color: '#33CC33' }}>
                    {totalAmount} VND
                </Title>
                <Space
                    style={{ width: "100%", justifyContent: "flex-end" }}
                >
                    <Button type="text" style={{ padding: 0, color: "#0099FF" }} onClick={onEdit}>
                        <EditOutlined />
                        {t('edit')}
                    </Button>

                    <Button type="text" style={{ padding: 0, color: "#CC0033" }} onClick={onRemove}>
                        <DeleteOutlined />
                        {t('remove')}
                    </Button>
                </Space>
            </Space>
        </Card>
    );
};

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
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('CreditCard');


    const handleRemove = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const showAddCardModal = () => {
        setIsModalVisible(true);
    };

    const handleAddCard = async (values: any) => {
        const { bankName, cardNumber } = values;
        setIsLoading(true);

        try {
            const res = await createCreditCard(bankName, cardNumber);

            if (res.ok) {
                setCards([...cards, { id: Date.now(), bankName, accountNumber: cardNumber, totalAmount: 0 }]);
                setIsModalVisible(false);
                form.resetFields();

                toast.success(t('addSuccess'));
            } else {
                toast.error(t('addError'));
            }
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('addError'));
        }
        setIsLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEdit = () => { }

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
                        onEdit={() => handleEdit()}
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
                        label={t('bankName')}
                        rules={[{ required: true, message: t('pleaseEnterBankName') }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cardNumber"
                        label={t('cardNumber')}
                        rules={[{ required: true, message: t('pleaseEnterCardNumber') }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <Button style={{ backgroundColor: '#f5222d', color: '#fff' }} onClick={handleCancel}>
                                {t('cancel')}
                            </Button>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                {t('add')}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default CreditCardPage;
