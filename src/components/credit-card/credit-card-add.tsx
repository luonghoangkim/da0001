import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { toast } from 'react-toastify';
import * as cardService from '../../service/credit-card/credit-card-service';
import { useTranslations } from 'next-intl';
import { REGEX } from "@/utils/app-constant";

interface CreditCardAddProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreditCardAdd: React.FC<CreditCardAddProps> = ({ isVisible, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('CreditCard');

    const handleAddCard = async (values: any) => {
        const { bankName, cardNumber, totalAmount } = values;
        setIsLoading(true);

        try {
            await cardService.createCreditCard(bankName, cardNumber, totalAmount);
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
                    rules={[
                        { required: true, message: t('pleaseEnterCardNumber') },
                        {
                            pattern: REGEX.CARDNUMBER,
                            message: t('cardNumberInvalid')
                        }
                    ]}
                >
                    <Input style={{ width: '100%' }} maxLength={16} />
                </Form.Item>
                <Form.Item
                    name="totalAmount"
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