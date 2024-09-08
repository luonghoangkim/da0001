'use client'

import AuthenticatedLayout from '../authenticated-layout';

const TransactionPage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is transaction
      </div>
    </AuthenticatedLayout>
  )
}

export default TransactionPage;