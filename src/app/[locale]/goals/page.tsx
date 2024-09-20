'use client'

import GoalsPage from '@/components/goals/goals-page';
import AuthenticatedLayout from '../authenticated-layout';

const Goals = () => {
  return (
    <AuthenticatedLayout>
      <GoalsPage />
    </AuthenticatedLayout>
  )
}

export default Goals;