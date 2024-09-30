import React, { useState } from 'react';
import { Card, Col, Statistic, Divider } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { APP_CSS } from '@/utils/app-css';

const creditCards = [
    { name: "Card 1", balance: 25000 },
    { name: "Card 2", balance: 15000 },
    { name: "Card 3", balance: 35000 },
];



const InteractiveBalanceCard = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % creditCards.length);
    };

    const prevCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + creditCards.length) % creditCards.length);
    };

    return (
        <Col xs={47} sm={12} md={8}>
            <Card title="Total Balance" bordered={false} style={APP_CSS.cardStyle} bodyStyle={APP_CSS.cardBodyStyle}>
                <Statistic title="All Accounts" value={240399} precision={2} />
                <Divider style={{ margin: "10px 0" }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <LeftOutlined onClick={prevCard} style={{ cursor: 'pointer' }} />
                    <Statistic
                        title={`Credit Card (${creditCards[currentCardIndex].name})`}
                        value={creditCards[currentCardIndex].balance}
                        precision={2}
                    />
                    <RightOutlined onClick={nextCard} style={{ cursor: 'pointer' }} />
                </div>
            </Card>
        </Col>
    );
};

export default InteractiveBalanceCard;