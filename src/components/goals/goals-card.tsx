import React from 'react';
import { useTranslations } from 'next-intl';
import { APP_FORMATTERS } from '@/utils';
import { Progress, ProgressProps } from 'antd';
import { DeleteOutlined, DollarOutlined, EditOutlined, HomeOutlined, ScheduleOutlined } from '@ant-design/icons';

interface HousingExpenseProps {
    amount: number;
    goals: number;
    categories: string;
    onAdjust: () => void;
    onRemove: () => void;
}
const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};
export const GoalsCard: React.FC<HousingExpenseProps> = ({ amount, goals, categories, onAdjust, onRemove }) => {
    const t = useTranslations('Goals');

    const percent = Math.round(Math.min((amount / goals) * 100, 100));

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-80">
            <div className="flex justify-between items-center">
                <ScheduleOutlined style={{ fontSize: '24px', color: '#e13511' }} />
                <h4 className="text-lg font-semibold ml-2">{categories}</h4>
            </div>
            <h3 className="text-xl font-bold mb-1">
                {APP_FORMATTERS.formatCurrency(amount)} VND
            </h3>
            <div className="relative">
                <Progress
                    percent={percent}
                    strokeColor={twoColors}
                    showInfo={true}
                />
            </div>
            <h3 className="text-2xl font-bold text-green-600">
                {APP_FORMATTERS.formatCurrency(goals)} VND
            </h3>
            <div className="flex mt-2 justify-end">
                <button
                    onClick={onAdjust}
                    className="text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md flex items-center"
                >
                    <DollarOutlined />
                </button>
                {/* <button
                    onClick={onAdjust}
                    className="text-blue-500 border ml-2 border-blue-500 px-2 py-1 rounded-md flex items-center"
                >
                    <EditOutlined />
                </button> */}
                <button
                    onClick={onRemove}
                    className="text-red-500 border ml-2 border-red-500 px-2 py-1 rounded-md flex items-center"
                >
                    <DeleteOutlined />
                </button>
            </div>
        </div>
    );
};
