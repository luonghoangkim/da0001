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
import DeleteConfirmationModal from "./goals-delete-form";

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

    const handleDeleteGoals = async (values: { card_id: string }): Promise<void> => {
        if (!selectedGoals) return;
        try {
            await GOALS_SERVICE.deleteItem(selectedGoals, values.card_id);
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

    return (
        <>
            <Spin spinning={isLoadingSearch}>
                <div className="flex flex-wrap bg-gray-100 justify-start gap-4">
                    {cards.map(goal => (
                        <GoalsCard
                            key={goal?._id}
                            amount={goal?.saving_amount}
                            goals={goal?.saving_goals_amount}
                            categories={goal.category_id?.cate_name}
                            onRemove={() => showDeleteModal(goal._id ?? "")}
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
                <DeleteConfirmationModal
                    isVisible={isDeleteModalVisible}
                    onCancel={() => setIsDeleteModalVisible(false)}
                    onConfirm={handleDeleteGoals}
                    savingId={selectedGoals ?? ''}
                />
            </Spin>
        </>
    );
};

export default GoalsPage;