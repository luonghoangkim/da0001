import React from 'react';
import { Modal, Button, Form } from 'antd';
import { useTranslations } from 'next-intl';
import CardSelectedComponent from '../transaction/card-selected-component';

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (values: { card_id: string }) => void;
    savingId: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isVisible,
    onCancel,
    onConfirm,
    savingId
}) => {
    const [form] = Form.useForm();
    const t = useTranslations('CreditCard');

    const handleConfirm = () => {
        form.validateFields().then((values) => {
            onConfirm(values);
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title={t('confirmDelete')}
            open={isVisible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {t('cancel')}
                </Button>,
                <Button
                    key="delete"
                    type="primary"
                    danger
                    onClick={handleConfirm}
                >
                    {t('remove')}
                </Button>,
            ]}
        >
            <p className='mb-2'>{t('confirmDeleteMessage')}</p>
            <Form form={form}>
                <CardSelectedComponent />
            </Form>
        </Modal>
    );
};

export default DeleteConfirmationModal;