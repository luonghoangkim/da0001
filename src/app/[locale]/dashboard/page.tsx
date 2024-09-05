'use client'

import AuthenticatedLayout from '../authenticated-layout';

const DashboardPage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is dashboard
      </div>
    </AuthenticatedLayout>
  )
}

export default DashboardPage;