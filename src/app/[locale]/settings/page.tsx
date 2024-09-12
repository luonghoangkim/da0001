'use client'

import AuthenticatedLayout from '../authenticated-layout';
import ProfileForm from './setting-form';

const SettingPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="p-4 bg-white rounded-md shadow-md h-auto w-10/12">
        <div className="flex justify-between items-center mb-4 ml-10">
          <ProfileForm />
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default SettingPage;