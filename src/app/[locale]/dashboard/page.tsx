'use client'

import AuthenticatedLayout from '../authenticated-layout';
import DashboardPage from '@/components/dashboard/dashboard-page';

const Dashboard = () => {
  return (
    <AuthenticatedLayout>
      <DashboardPage />
    </AuthenticatedLayout>
  )
}

export default Dashboard;