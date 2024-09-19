

"use client";
import React from "react";
import AuthenticatedLayout from "../authenticated-layout";
import TransactionPage from "../../../components/transaction/transaction-page";


const Transaction = () => {
  return (
    <AuthenticatedLayout>
      <TransactionPage />
    </AuthenticatedLayout>
  );
};

export default Transaction;
