"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { CreditCardComponent } from "./credit-card-component";
import CreditCardAdd from "./credit-card-add";
import CreditCardEdit from "./credit-card-edit";
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";
import { CardModel } from "@/models/card-modal/credit-card.modal";

const CreditCardPage = () => {
    const [cards, setCards] = useState<CardModel[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const t = useTranslations('CreditCard');

    const handleSearchCreditCards = async () => {
        setIsLoadingSearch(true);
        try {
            const response = await CREDIT_CARD_SERVICE.searchData();
            const creditCards = response.data;
            setCards(creditCards);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('fetchError'));
        }
        setIsLoadingSearch(false);
    };

    useEffect(() => {
        handleSearchCreditCards();
    }, []);

    const showAddCardModal = () => setIsAddModalVisible(true);
    const showEditCardModal = (card: CardModel) => {
        setSelectedCard(card);
        setIsEditModalVisible(true);
    };
    const showDeleteModal = (card_id: string) => {
        setSelectedCardId(card_id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteCreditCard = async () => {
        if (!selectedCardId) return;
        try {
            await CREDIT_CARD_SERVICE.deleteItem(selectedCardId);
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

    return (
        <>
            <Spin spinning={isLoadingSearch}>
                <div className="flex flex-wrap bg-gray-100 justify-start gap-4">
                    {cards.map(card => (
                        <CreditCardComponent
                            key={card._id}
                            bankName={card.card_short_name ?? ""}
                            accountNumber={card.card_number}
                            totalAmount={card.card_amount}
                            onRemove={() => showDeleteModal(card._id ?? "")}
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

                <CreditCardAdd
                    isVisible={isAddModalVisible}
                    onClose={() => setIsAddModalVisible(false)}
                    onSuccess={handleSearchCreditCards}
                />

                <CreditCardEdit
                    isVisible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    onSuccess={handleSearchCreditCards}
                    card={selectedCard}
                />

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
                            onClick={handleDeleteCreditCard}
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