'use client'

import AuthenticatedLayout from '../authenticated-layout';

const SettingPage = () => {
  return (
    <AuthenticatedLayout>
      <div className='flex justify-center'>
        This is setting
      </div>
    </AuthenticatedLayout>
  )
}

export default SettingPage;