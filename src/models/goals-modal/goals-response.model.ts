interface Category {
    _id: string;
    cate_name: string;
    cate_type: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GoalsResponse {
    _id: string;
    category_id: Category;
    saving_goals_amount: number;
    saving_amount: number;
    saving_date: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface UpdateAmountItem {
    saving_amount: number;
    card_id: string;
}

export interface SavingOverview {
    totalSavingAmount: number;
    totalSavingGoal: number;
}
