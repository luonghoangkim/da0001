"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Form, Select } from 'antd';
import * as cardService from '../../service/credit-card/credit-card-service';
import { useTranslations } from 'next-intl';

const { Option } = Select;

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    totalAmount: number;
}

const CartSelectedComponent = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const t = useTranslations('Transaction');

    const handleSearchCreditCards = async () => {
        try {
            const creditCards = await cardService.getCreditCards();
            setCards(creditCards);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('fetchError'));
        }
    };

    useEffect(() => {
        handleSearchCreditCards();
    }, []);

    return (
        <div>
            <Form.Item
                name="bankCard"
                label={t('bank')}
            >
                <Select placeholder={t('selectBankCard')}>
                    {cards.map((card) => (
                        <Option key={card._id} value={card.card_number}>
                            {`${card.bank_name} - ${card.card_number}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    );
};

export default CartSelectedComponent;