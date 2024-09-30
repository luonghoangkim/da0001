import React, { useEffect, useState } from 'react';
import { Card, Col, Table } from 'antd';
import { APP_FORMATTERS } from '@/utils';
import { useTranslations } from 'next-intl';
import { SearchTransaction, TransactionData } from '@/models/trans-modal/trans.modal';
import { TRANSACTION_SERVICE } from '@/service/transaction/transaction-service';
import { toast } from 'react-toastify';


const TransactionDashboardCard = () => {
    const t = useTranslations('Transaction');
    const commonLanguage = useTranslations('CommonLanguage');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<TransactionData[]>([]);

    const columns = [
        {
            title: t('category'),
            dataIndex: ['category_id', 'cate_name'],
            key: 'category_name',
        },
        {
            title: t('date'),
            dataIndex: 'trans_date',
            key: 'trans_date',
            render: (text: string) => <span className="justify-center items-center font-bold">{APP_FORMATTERS.formatDate(text, "DD/MM/YYYY")}</span>,
        },
        {
            title: t('amount'),
            dataIndex: 'trans_amount',
            key: 'trans_amount',
            render: (text: string) => <span className="font-bold">{APP_FORMATTERS.formatCurrency(Number(text))}</span>,
        },
        {
            title: t('cardId'),
            dataIndex: ['card_id', 'card_number'],
            key: 'card_id',
            render: (text: number) => <span className="justify-center items-center">{APP_FORMATTERS.formatCardNumber(text)}</span>,
        },
        {
            title: t('description'),
            dataIndex: 'trans_note',
            key: 'trans_note',
        },
    ];

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setData([]);
            const trans_type = "";
            const payload: SearchTransaction = {
                trans_type
            };
            const response = await TRANSACTION_SERVICE.searchData(payload);

            if (response && response.data) {
                setData(response.data);
            } else {
                console.error('Data format is not as expected:', response);
                setData([]);
            }
            setLoading(false);
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error(commonLanguage('errorOccurred'));
            }
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <Col xs={24} lg={12}>
            <Card title="Recent Transactions" bordered={false}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={isLoading}
                    rowKey="_id"
                />
            </Card>
        </Col>
    );
};

export default TransactionDashboardCard;