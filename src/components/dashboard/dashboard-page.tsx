"use client";
import AuthenticatedLayout from "@/app/[locale]/authenticated-layout";
import {
    Card,
    Col,
    Row,
    Statistic,
    Progress,
    List,
    Divider,
    Table,
    ProgressProps,
    Typography,
} from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import InteractiveBalanceCard from "./card-dashboard-component";
import GoalProgressCard from "./goals-dashboard-component";
import TransactionDashboardCard from "./transaction-dashboard-component";
import StaticComponent from "./statistics-dashboard-component";
import SlideComponent from "./slide-dashboard-component copy";

const imageList = [
    "/slide1.jpeg",
    "/slide2.jpeg",
    "/slide3.jpeg",
];

const DashboardPage = () => {

    return (
        <div style={{ padding: "24px" }}>
            <Row gutter={16}>
                <InteractiveBalanceCard />
                <GoalProgressCard currentAmount={15000000} goalAmount={20000000} />
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
