"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import GoalsAdd from "./goals-add-form";
import GoalsEdit from "./goals-edit-form";
import { GoalsResponse } from "@/models/goals-modal/goals-response.model";
import { GoalsCard } from "./goals-card";
import { GOALS_SERVICE } from "@/service/goals/goals-service";

const GoalsPage = () => {
    const [cards, setCards] = useState<GoalsResponse[]>([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedGoals, setSelectedGoalId] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<GoalsResponse | null>(null);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const t = useTranslations('CreditCard');

    const handleSearchCreditCards = async () => {
        setIsLoadingSearch(true);
        try {
            const response = await GOALS_SERVICE.searchData();
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
    const showEditCardModal = (goal: GoalsResponse) => {
        setSelectedCard(goal);
        setIsEditModalVisible(true);
    };
    const showDeleteModal = (goal_id: string) => {
        setSelectedGoalId(goal_id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteGoals = async () => {
        if (!selectedGoals) return;
        try {
            await GOALS_SERVICE.deleteItem(selectedGoals);
            toast.success(t('removeSuccess'));
            handleSearchCreditCards();
        } catch (error) {
            console.error('Error during delete:', error);
            toast.error(t('removeError'));
        } finally {
            setIsDeleteModalVisible(false);
            setSelectedGoalId(null);
        }
    };
    console.log({cards: cards})
    return (
        <>
            <Spin spinning={isLoadingSearch}>
                <div className="flex flex-wrap bg-gray-100 justify-start gap-4">
                    {cards.map(goal => (
                        <GoalsCard
                            key={goal.saving?._id}
                            amount={goal.saving?.saving_amount}
                            goals={goal.saving?.saving_goals_amount}
                            categories={goal.category?.category_name}
                            onRemove={() => showDeleteModal(goal.saving._id ?? "")}
                            onAdjust={() => showEditCardModal(goal)}
                        />
                    ))}
                    <div
                        className="w-80 h-48 mb-4 flex justify-center items-center cursor-pointer bg-white shadow-lg rounded-lg"
                        onClick={showAddCardModal}
                    >
                        <PlusOutlined style={{ fontSize: 24 }} />
                    </div>
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
                    goals={selectedCard}
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
                            onClick={handleDeleteGoals}
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