'use client'

import AuthenticatedLayout from '../authenticated-layout';
import ProfileForm from '../../../components/settings/setting-form';

const SettingPage = () => {
  return (
    <AuthenticatedLayout>
      <ProfileForm />
    </AuthenticatedLayout>
  )
}

export default SettingPage;