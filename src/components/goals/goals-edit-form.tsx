import React, { useState, useEffect } from "react";
import { Modal, Form, InputNumber, Button } from "antd";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { GoalsResponse, UpdateAmountItem } from "@/models/goals-modal/goals-response.model";
import { GOALS_SERVICE } from "@/service/goals/goals-service";
import CardSelectedComponent from "../transaction/card-selected-component";

interface GoalsEditProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    goals: GoalsResponse | null;
}

const GoalsEdit: React.FC<GoalsEditProps> = ({ isVisible, onClose, onSuccess, goals }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('Goals');
    const commonLanguage = useTranslations('CommonLanguage');

    useEffect(() => {
        if (goals) {
            form.setFieldsValue({
                // card_id: goals._id,
            });
        }
    }, [goals, form]);

    const handleEditGoals = async (values: UpdateAmountItem) => {
        if (!goals) return;
        setIsLoading(true);

        try {
            const payload = values;
            await GOALS_SERVICE.updateAmountItem(goals._id, payload);
            onClose();
            form.resetFields();
            toast.success(t('updateSuccess'));
            onSuccess();
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    toast.error(commonLanguage('insufficientBalance'));
                } else {
                    toast.error(commonLanguage('updateError'));
                }
            }
        }
        setIsLoading(false);
    };

    return (
        <Modal
            title={t('editGoals')}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleEditGoals}>
                <Form.Item
                    name="saving_amount"
                    label={t('addMoreAmount')}
                    rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <CardSelectedComponent />
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button style={{ backgroundColor: '#f5222d', color: '#fff' }} onClick={onClose}>
                            {commonLanguage('cancel')}
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {commonLanguage('save')}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalsEdit;