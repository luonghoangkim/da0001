
import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { CardModel } from "@/models/card-modal/credit-card.modal";
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";
import BankSelectedComponent from "../credit-card/bank-selected-component";

interface CreditCardEditProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    card: CardModel | null;
}

const CreditCardEdit: React.FC<CreditCardEditProps> = ({ isVisible, onClose, onSuccess, card }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('CreditCard');

    useEffect(() => {
        if (card) {
            form.setFieldsValue({
                card_code: card.card_code,
                card_number: card.card_number,
                card_amount: card.card_amount,
            });
        }
    }, [card, form]);

    const handleEditCard = async (values: any) => {
        if (!card) return;
        setIsLoading(true);

        try {
            const payload: CardModel = values;
            await CREDIT_CARD_SERVICE.updateItem(card._id ?? '', payload);
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
    console.log({ card: card?.card_code })
    return (
        <Modal
            title={t('editCard')}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleEditCard}>
                <BankSelectedComponent initialCardCode={card?.card_code} />
                <Form.Item
                    name="card_number"
                    label={t('cardNumber')}
                    rules={[
                        { required: true, message: t('pleaseEnterCardNumber') },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} min={16} />
                </Form.Item>
                <Form.Item
                    name="card_amount"
                    label={t('amount')}
                    rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button style={{ backgroundColor: '#f5222d', color: '#fff' }} onClick={onClose}>
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

export default CreditCardEdit;