import React, { useState } from "react";
import { Modal, Form, InputNumber, Button } from "antd";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { CardModel } from "@/models/card-modal/credit-card.modal";
import CardSelectedComponent from "../transaction/card-selected-component";
import CategoriesSelectedComponent from "../transaction/categories-selected-component";
import { GOALS_SERVICE } from "@/service/goals/goals-service";
import { CreateGoalsModel } from "@/models/goals-modal/goals.modal";

interface GoalsAddProps {
    isVisible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const GoalsAdd: React.FC<GoalsAddProps> = ({ isVisible, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('Goals');
    const commonLanguage = useTranslations('CommonLanguage');

    const handleAddCard = async (values: CreateGoalsModel) => {
        setIsLoading(true);

        try {
            const payload = values;
            await GOALS_SERVICE.create(payload);
            onClose();
            form.resetFields();
            toast.success(t('createSucces'));
            onSuccess();
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    toast.error(commonLanguage('insufficientBalance'));
                } else {
                    toast.error(commonLanguage('createError'));
                }
            }
        }
        setIsLoading(false);
    };

    return (
        <Modal
            title={t('addGoals')}
            open={isVisible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleAddCard}>
                <Form.Item
                    name="saving_amount"
                    label={t('savingAmount')}
                    rules={[{ required: true, message: t('pleaseEnterAmount') }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="saving_goal"
                    label={t('savingGoal')}
                    rules={[
                        { required: true, message: t('pleaseEnterAmount') },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('saving_amount') < value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('goalMustBeGreater')));
                            },
                        }),
                    ]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <CardSelectedComponent />
                <CategoriesSelectedComponent cate_type={"DM003"} />
                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <Button style={{ backgroundColor: '#f5222d', color: '#fff' }} onClick={onClose}>
                            {commonLanguage('cancel')}
                        </Button>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {commonLanguage('add')}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GoalsAdd;