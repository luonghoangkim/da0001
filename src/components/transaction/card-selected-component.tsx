"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Form, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";

const { Option } = Select;

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    card_amount: number;
    card_short_name: string;
}
interface BankSelectedComponentProps {
    initialCardId?: string;
}

const CardSelectedComponent: React.FC<BankSelectedComponentProps> = ({  }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const t = useTranslations('Transaction');

    const handleSearchCreditCards = async () => {
        try {
            const response = await CREDIT_CARD_SERVICE.searchData();
            const creditCards = response.data;
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
                name="card_id"
                label={t('selectBankCard')}
                rules={[{ required: true, message: t('pleaseEnterBankCard') }]}
            >
                <Select placeholder={t('selectBankCard')} allowClear>
                    {cards.map((card) => (
                        <Option key={card._id} value={card._id}>
                            {`${card.card_short_name} - ${card.card_number}`}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    );
};

export default CardSelectedComponent;