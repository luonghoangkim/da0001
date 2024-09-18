"use client";
import React from "react";
import AuthenticatedLayout from "../authenticated-layout";
import CreditCardPage from "./credit-card-page";


const CreditCard = () => {


    return (
        <AuthenticatedLayout>
            <CreditCardPage />
        </AuthenticatedLayout>
    );
};

export default CreditCard;
