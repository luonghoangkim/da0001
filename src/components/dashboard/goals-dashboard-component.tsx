import React from 'react';
import { Card, Col, Row, Progress } from 'antd';
import { APP_CSS } from '@/utils/app-css';

interface GoalProgressCardProps {
    currentAmount: number;
    goalAmount: number;
}

const GoalProgressCard: React.FC<GoalProgressCardProps> = ({ currentAmount, goalAmount }) => {
    const progress = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    return (
        <Col xs={24} sm={12} md={8} style={{ height: "253px" }}>
            <Card title="Goals" bordered={false} style={APP_CSS.cardStyle} bodyStyle={APP_CSS.cardBodyStyle}>
                <Row gutter={16}>
                    <Col span={12}>
                        <div className='font-semibold text-lg' >Current Amount</div>
                        <div>{currentAmount} VND</div>
                        <div className='font-semibold text-xl pt-3' >Goal Amount</div>
                        <div>{goalAmount} VND</div>
                    </Col>
                    <Col span={12}>
                        <Progress
                            type="circle"
                            percent={progress}
                            strokeColor={twoColors}
                            format={(percent) => `${percent}%`}
                        />
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default GoalProgressCard;
