import React, { useEffect, useState } from 'react';
import { Card, Col, Tooltip, Spin } from 'antd';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { SearchTransaction, TransactionData } from '@/models/trans-modal/trans.modal';
import { TRANSACTION_SERVICE } from '@/service/transaction/transaction-service';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

const StaticComponent = () => {
    const t = useTranslations('Dashboard');
    const commonLanguage = useTranslations('CommonLanguage');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<TransactionData[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const payload: SearchTransaction = {
                trans_type: ""
            };
            const response = await TRANSACTION_SERVICE.searchData(payload);

            if (response && response.data) {
                setData(response.data);
                processData(response.data);
            } else {
                console.error('Data format is not as expected:', response);
                setData([]);
            }
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error(commonLanguage('errorOccurred'));
            }
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const processData = (rawData: TransactionData[]) => {
        const dataMap: { [key: string]: { name: string, expense: number, income: number } } = {};

        rawData.forEach(item => {
            const date = new Date(item.trans_date).toLocaleDateString();
            if (!dataMap[date]) {
                dataMap[date] = { name: date, expense: 0, income: 0 };
            }

            if (item.trans_type === 'TT001') {
                dataMap[date].expense += item.trans_amount;
            } else if (item.trans_type === 'TT002') {
                dataMap[date].income += item.trans_amount;
            }
        });

        const processedData = Object.values(dataMap).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
        setChartData(processedData);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <Col xs={24} lg={12}>
            <Card title={t('tradingCharts')}>
                {isLoading ? (
                    <div style={{ height: 330, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={330}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="expense" name={t('expense')} stroke="#ff4d4f" />
                            <Line type="monotone" dataKey="income" name={t('income')} stroke="#52c41a" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Card>
        </Col>
    );
};

export default StaticComponent;