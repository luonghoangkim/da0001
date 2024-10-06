"use client";

import { useEffect, useState } from "react";
import { Row, Spin } from "antd";
import InteractiveBalanceCard from "./card-dashboard-component";
import GoalProgressCard from "./goals-dashboard-component";
import TransactionDashboardCard from "./transaction-dashboard-component";
import StaticComponent from "./statistics-dashboard-component";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { CREDIT_CARD_SERVICE } from "@/service/credit-card/credit-card-service";
import SlideComponent from "./slide-dashboard-component copy";
import { GOALS_SERVICE } from "@/service/goals/goals-service";
import { SavingOverview } from "@/models/goals-modal/goals-response.model";

const imageList = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
];

const DashboardPage: React.FC = () => {
    const [cardData, setCardData] = useState(null);
    const [goalsData, setGoalsData] = useState<SavingOverview>();

    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations('Dashboard');

    const loadDataCard = async () => {
        try {
            const response = await CREDIT_CARD_SERVICE.totalCardAmount();
            setCardData(response.data);
        } catch (error: any) {
            console.error('Error during data fetch:', error);
            toast.error(t('fetchError'));
        }
    };

    const loadDataGoals = async () => {
        try {
            const response = await GOALS_SERVICE.totalGoalsAmount();
            setGoalsData(response.data);
        } catch (error: any) {
            console.error('Error during data fetch:', error);
            toast.error(t('fetchError'));
        }
    };

    const loadData = async () => {
        try {
            loadDataCard();
            loadDataGoals();
        } catch (error: any) {
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        loadData();
    }, []);

    if (isLoading) {
        return <Spin />;
    }


    return (
        <div>
            <Row gutter={16}>
                <InteractiveBalanceCard cardData={cardData} />
                <GoalProgressCard currentAmount={goalsData?.totalSavingAmount ?? 0} goalAmount={goalsData?.totalSavingGoal ?? 0} />
                <SlideComponent images={imageList} />
            </Row>

            <Row gutter={16} style={{ marginTop: "24px" }}>
                <TransactionDashboardCard />
                <StaticComponent />
            </Row>
        </div>
    );
};

export default DashboardPage;
