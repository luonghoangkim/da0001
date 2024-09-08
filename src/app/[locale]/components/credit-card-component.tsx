
import { formatCurrency } from "@/utils";
import { CreditCardOutlined, BankOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Typography, Button, Space } from "antd";
import { useTranslations } from 'next-intl';


const { Text, Title } = Typography;

interface CreditCardProps {
    bankName: string;
    accountNumber: string;
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
                    <CreditCardOutlined style={{ paddingRight: "10px" }} /> {accountNumber}
                </Title>
                <Text type="secondary"> {t('totalAmount')}</Text>
                <Title level={3} style={{ color: '#33CC33' }}>
                    {formatCurrency(totalAmount)} VND
                </Title>
                <Space
                    style={{ width: "100%", justifyContent: "flex-end" }}
                >
                    <Button type="text" style={{ padding: 0, color: "#0099FF" }} onClick={onEdit}>
                        <EditOutlined />
                        {t('edit')}
                    </Button>

                    <Button type="text" style={{ padding: 0, color: "#CC0033" }} onClick={onRemove}>
                        <DeleteOutlined />
                        {t('remove')}
                    </Button>
                </Space>
            </Space>
        </Card>
    );
};
