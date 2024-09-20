"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import * as goalsService from '../../service/goals/goals-service';
import { useTranslations } from 'next-intl';
import { GoalsCard } from "./goals-card";
import GoalsAdd from "./goals-add";
import GoalsEdit from "./goals-edit";

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    total_amount: number;
}

const GoalsPage = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const t = useTranslations('Goals');

    const handleSearchCreditCards = async () => {
        setIsLoadingSearch(true);
        try {
            const creditCards = await goalsService.getCreditCards();
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
    const showEditCardModal = (card: Card) => {
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
            await goalsService.deleteCreditCards(selectedCardId);
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

                <GoalsAdd
                    isVisible={isAddModalVisible}
                    onClose={() => setIsAddModalVisible(false)}
                    onSuccess={handleSearchCreditCards}
                />

                <GoalsEdit
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