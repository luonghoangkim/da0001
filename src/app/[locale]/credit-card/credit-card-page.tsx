"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Input, Form, InputNumber, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import * as cardService from './service/credit-card-service';
import { useTranslations } from 'next-intl';
import { CreditCardComponent } from "../components/credit-card-component";
import { SP } from "next/dist/shared/lib/utils";

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    total_amount: number;
}


const CreditCardPage = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const t = useTranslations('CreditCard');
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [editForm] = Form.useForm();

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showAddCardModal = () => {
        setIsModalVisible(true);
    };

    const showEditCardModal = (card: Card) => {
        setSelectedCard(card);
        editForm.setFieldsValue({
            bankName: card.bank_name,
            cardNumber: card.card_number,
            totalAmount: card.total_amount,
        });
        setIsEditModalVisible(true);
    };

    const handleAddCard = async (values: any) => {
        const { bankName, cardNumber, totalAmount } = values;
        setIsLoading(true);

        try {
            await cardService.createCreditCard(bankName, cardNumber, totalAmount);
            setIsModalVisible(false);
            form.resetFields();

            toast.success(t('addSuccess'));
            handleSearchCreditCards();

        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('addError'));
        }
        setIsLoading(false);
    };

    const handleEditCard = async (values: any) => {
        if (!selectedCard) return;

        const { bankName, cardNumber } = values;
        setIsLoading(true);

        try {
            await cardService.updateCreditCards(selectedCard._id, bankName, cardNumber);
            setIsEditModalVisible(false);
            editForm.resetFields();
            toast.success(t('editSuccess'));
            handleSearchCreditCards();
        } catch (error) {
            console.error('Error during edit:', error);
            toast.error(t('editError'));
        }
        setIsLoading(false);
    };

    const handleDeleteCreditCard = async () => {
        if (!selectedCardId) return;
        try {
            await cardService.deleteCreditCards(selectedCardId);
            toast.success(t('removeSuccess'));
            handleSearchCreditCards();
        } catch (error) {
            console.error('Error during delete:', error);
            toast.error(t('removeError'));
        } finally {
            setIsDeleteModalVisible(false);
            setSelectedCardId(null);
        }
    };

    const showDeleteModal = (card_id: string) => {
        setSelectedCardId(card_id);
        setIsDeleteModalVisible(true);
    };
    const handleSearchCreditCards = async () => {
        setIsLoadingSearch(true);
        try {
            const creditCards = await cardService.getCreditCards();
            setCards(creditCards);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('fetchError'));
        }
        setIsLoadingSearch(false);
    };

    useEffect(() => {
        handleSearchCreditCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Spin spinning={isLoadingSearch}>
                <div className="flex flex-wrap bg-gray-100 justify-start gap-4">
                    {cards.map(card => (
                        <CreditCardComponent
                            key={card._id}
                            bankName={card.bank_name}
                            accountNumber={card.card_number}
                            totalAmount={card.total_amount}
                            onRemove={() => showDeleteModal(card._id)}
                            onEdit={() => showEditCardModal(card)}
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
                    title={t('pleaseEnterBankName')}
                    open={isModalVisible}
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
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="totalAmount"
                            label={t('amount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <InputNumber min={0} style={{ width: '100%' }} />
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

                {/* Modal chỉnh sửa thẻ */}
                <Modal
                    title={t('editCard')}
                    open={isEditModalVisible}
                    onCancel={() => setIsEditModalVisible(false)}
                    footer={null}
                >
                    <Form form={editForm} layout="vertical" onFinish={handleEditCard}>
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
                        <Form.Item
                            name="totalAmount"
                            label={t('amount')}
                            rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <Button onClick={() => setIsEditModalVisible(false)}>
                                    {t('cancel')}
                                </Button>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    {t('save')}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal xác nhận xóa */}
                <Modal
                    title={t('confirmDelete')}
                    open={isDeleteModalVisible}
                    onCancel={() => setIsDeleteModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
                            {t('cancel')}
                        </Button>,
                        <Button
                            key="delete"
                            type="primary"
                            danger
                            onClick={() => handleDeleteCreditCard()}
                        >
                            {t('remove')}
                        </Button>,
                    ]}
                >
                    <p>{t('confirmDeleteMessage')}</p>
                </Modal>
            </Spin>
        </>

    );
};

export default CreditCardPage;
