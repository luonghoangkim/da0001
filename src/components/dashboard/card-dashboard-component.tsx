// card-dashboard-component.tsx
import React, { useState } from 'react';
import { Card, Col, Statistic, Divider } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { APP_CSS } from '@/utils/app-css';
import { useTranslations } from 'next-intl';

interface CardData {
    card_name: string;
    card_number: number;
    card_amount: number | null;
}

interface ApiResponse {
    cards: CardData[];
    totalAllCardAmount: number | null;
}

interface InteractiveBalanceCardProps {
    cardData: ApiResponse | null;
}

const InteractiveBalanceCard: React.FC<InteractiveBalanceCardProps> = ({ cardData }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const t = useTranslations('Dashboard');

    const nextCard = () => {
        if (cardData && cardData.cards.length > 0) {
            setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.cards.length);
        }
    };

    const prevCard = () => {
        if (cardData && cardData.cards.length > 0) {
            setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cardData.cards.length) % cardData.cards.length);
        }
    };

    const formatValue = (value: number | null): string | number => {
        return value !== null && value !== undefined ? value : '---';
    };

    if (!cardData || cardData.cards.length === 0) {
        return null;
    }

    return (
        <Col xs={47} sm={12} md={8}>
            <Card title={t('totalBalance')} bordered={false} style={APP_CSS.cardStyle} bodyStyle={APP_CSS.cardBodyStyle}>
                <Statistic title={t('allAccounts')} value={formatValue(cardData.totalAllCardAmount)} precision={2} />
                <Divider style={{ margin: "10px 0" }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <LeftOutlined onClick={prevCard} style={{ cursor: 'pointer' }} />
                    <Statistic
                        title={`${t('creditCard')} (${cardData.cards[currentCardIndex].card_name})`}
                        value={formatValue(cardData.cards[currentCardIndex].card_amount)}
                        precision={2}
                    />
                    <RightOutlined onClick={nextCard} style={{ cursor: 'pointer' }} />
                </div>
            </Card>
        </Col>
    );
};

export default InteractiveBalanceCard;
