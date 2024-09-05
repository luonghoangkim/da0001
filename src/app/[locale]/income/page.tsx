'use client'

import AuthenticatedLayout from '../authenticated-layout';

const IncomePage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is income
      </div>
    </AuthenticatedLayout>
  )
}

export default IncomePage;