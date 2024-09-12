"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Form, Select } from 'antd';
import * as cardService from '../credit-card/service/credit-card-service';
const { Option } = Select;

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    totalAmount: number;
}

const CartSelectedComponent = () => {
    const [cards, setCards] = useState<Card[]>([]);

    const handleSearchCreditCards = async () => {
        try {
            const creditCards = await cardService.getCreditCards();
            setCards(creditCards);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error('fetch error');
        }
    };

    useEffect(() => {
        handleSearchCreditCards();
    }, []);

    return (
        <div>
            <Form.Item
                name="bankCard"
                label="Thẻ chi"
            >
                <Select placeholder="Chọn thẻ chi">
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