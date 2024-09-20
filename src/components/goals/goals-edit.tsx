import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast } from 'react-toastify';
import * as goalsService from '../../service/goals/goals-service';
import { useTranslations } from 'next-intl';

interface Card {
    _id: string;
    bank_name: string;
    card_number: string;
    total_amount: number;
}

interface GoalsEditProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    card: Card | null;
}

const GoalsEdit: React.FC<GoalsEditProps> = ({ isVisible, onClose, onSuccess, card }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('Goals');

    useEffect(() => {
        if (card) {
            form.setFieldsValue({
                bankName: card.bank_name,
                cardNumber: card.card_number,
                totalAmount: card.total_amount,
            });
        }
    }, [card, form]);

    const handleEditCard = async (values: any) => {
        if (!card) return;

        const { bankName, cardNumber } = values;
        setIsLoading(true);

        try {
            await goalsService.updateCreditCards(card._id, bankName, cardNumber);
            onClose();
            form.resetFields();
            toast.success(t('editSuccess'));
            onSuccess();
        } catch (error) {
            console.error('Error during edit:', error);
            toast.error(t('editError'));
        }
        setIsLoading(false);
    };

    return (
        <Modal
            title={t('editCard')}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleEditCard}>
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
                        <Button onClick={onClose}>
                            {t('cancel')}
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {t('save')}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalsEdit;