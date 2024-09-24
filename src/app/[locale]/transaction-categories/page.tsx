'use client'

import CategoriesPage from '@/components/transaction-categories/transaction-categories-page';
import AuthenticatedLayout from '../authenticated-layout';

const Categories = () => {
  return (
    <AuthenticatedLayout>
      <CategoriesPage />
    </AuthenticatedLayout>
  )
}

export default Categories;