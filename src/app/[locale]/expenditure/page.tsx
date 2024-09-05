'use client'

import AuthenticatedLayout from '../authenticated-layout';

const ExpenditurePage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is expenditure
      </div>
    </AuthenticatedLayout>
  )
}

export default ExpenditurePage;