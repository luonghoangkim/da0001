'use client'

import AuthenticatedLayout from '../authenticated-layout';

const IncomePage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is goals
      </div>
    </AuthenticatedLayout>
  )
}

export default IncomePage;