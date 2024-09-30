"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import CreditCardAdd from "./goals-add-form";
import CreditCardEdit from "./goals-edit-form";
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";
import { CardModel } from "@/models/card-modal/credit-card.modal";
import { CreditCardComponent } from "../credit-card/credit-card-component";
import { GoalsCard } from "./goals-card";

const GoalsPage = () => {
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
        } catch (error: any) {
            console.error('Error during call:', error);
            const status = error.response?.status;
            if (status == 500 || status == 401) {
                toast.error(t('fetchError'));
            }
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
                        <GoalsCard
                            key={card._id}
                            amount={card.card_number}
                            goals={card.card_amount}
                            categories={"ddd"}
                            onRemove={() => showDeleteModal(card._id ?? "")}
                            onAdjust={() => showEditCardModal(card)}
                        />
                    ))}
                    <div
                        className="w-80 h-48 mb-4 flex justify-center items-center cursor-pointer bg-white shadow-lg rounded-lg"
                        onClick={showAddCardModal}
                    >
                        <PlusOutlined style={{ fontSize: 24 }} />
                    </div>
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

export default GoalsPage;