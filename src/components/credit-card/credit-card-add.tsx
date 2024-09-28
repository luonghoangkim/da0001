import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import BankSelectedComponent from "./bank-selected-component";
import { CardModel } from "@/models/card-modal/credit-card.modal";
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";

interface CreditCardAddProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreditCardAdd: React.FC<CreditCardAddProps> = ({ isVisible, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('CreditCard');

    const handleAddCard = async (values: CardModel) => {
        setIsLoading(true);

        try {
            const payload = values;
            await CREDIT_CARD_SERVICE.create(payload);
            onClose();
            form.resetFields();
            toast.success(t('addSuccess'));
            onSuccess();
        } catch (error) {
            console.error('Error during call:', error);
            toast.error(t('addError'));
        }
        setIsLoading(false);
    };

    return (
        <Modal
            title={t('pleaseEnterBankName')}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAddCard}>
                <BankSelectedComponent />
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
                            {t('add')}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreditCardAdd;