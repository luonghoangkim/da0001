
import { APP_FORMATTERS } from "@/utils";
import { CreditCardOutlined, BankOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Typography, Button, Space } from "antd";
import { useTranslations } from 'next-intl';



const { Text, Title } = Typography;

interface CreditCardProps {
    bankName: string;
    accountNumber: number;
    totalAmount: number;
    onRemove: () => void;
    onEdit: () => void;
}

export const CreditCardComponent: React.FC<CreditCardProps> = ({ bankName, accountNumber, totalAmount, onRemove, onEdit }) => {
    const t = useTranslations('CreditCard');

    return (
        <Card style={{ width: 350, marginBottom: 10, height: 260 }} >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Space
                    align="baseline"
                    style={{ width: "100%", justifyContent: "space-between" }}
                >
                    <BankOutlined style={{ fontSize: '22px' }} />
                    <Text strong>{bankName}</Text>
                </Space>
                <Text type="secondary"> {t('cardNumber')}</Text>
                <Title level={4} style={{ margin: 0 }}>
                    <CreditCardOutlined style={{ paddingRight: "10px" }} /> {APP_FORMATTERS.formatCardNumber(Number(accountNumber))}
                </Title>
                <Text type="secondary"> {t('totalAmount')}</Text>
                <Title level={3} style={{ color: '#33CC33' }}>
                    {APP_FORMATTERS.formatCurrency(totalAmount)} VND
                </Title>
                <Space
                    style={{ width: "100%", justifyContent: "flex-end" }}
                >
                    <button
                        onClick={onEdit}
                        className="text-blue-500 border ml-2 border-blue-500 px-2 py-1 rounded-md flex items-center"
                    >
                        <EditOutlined style={{ paddingRight: 5 }} />
                        {t('edit')}
                    </button>
                    <button
                        onClick={onRemove}
                        className="text-red-500 border ml-2 border-red-500 px-2 py-1 rounded-md flex items-center"
                    >
                        <DeleteOutlined style={{ paddingRight: 5 }} />
                        {t('remove')}
                    </button>
                </Space>
            </Space>
        </Card>
    );
};
