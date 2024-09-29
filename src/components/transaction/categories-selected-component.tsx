"use client";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Form, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { TRANSACTION_CATEGORIES_SERVICE } from "@/service/transaction-categories/transaction-categories-service";
import { SearchCategories } from "@/models/transaction-categories-modal/transaction-categories.modal";

const { Option } = Select;

interface Categories {
    _id: string;
    cate_name: string;
}

// Define the props interface to accept cate_type
interface CategoriesSelectedComponentProps {
    cate_type?: string;
}

const CategoriesSelectedComponent: React.FC<CategoriesSelectedComponentProps> = ({ cate_type }) => {
    const [categories, setCards] = useState<Categories[]>([]);
    const t = useTranslations('Transaction');

    const handleSearchCreditCards = async () => {
        try {
            const payload: SearchCategories = {
                cate_type,
            };
            const response = await TRANSACTION_CATEGORIES_SERVICE.searchData(payload);
            const creditCards = response.data;
            setCards(creditCards);
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('fetchError'));
        }
    };

    useEffect(() => {
        handleSearchCreditCards();
    }, [cate_type]);

    return (
        <div>
            <Form.Item
                name="category_id"
                label={t('category')}
                rules={[{ required: true, message: t('pleaseEnterCategory') }]}
            >
                <Select placeholder={t('selectBankCard')}>
                    {categories.map((cate) => (
                        <Option key={cate._id} value={cate._id}>
                            {cate.cate_name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    );
};

export default CategoriesSelectedComponent;
