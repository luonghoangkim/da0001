interface Category {
    category_name: string;
    category_id: string;
}

interface Saving {
    _id: string;
    saving_goals_amount: number;
    saving_amount: number;
    saving_date: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface GoalsResponse {
    category: Category;
    saving: Saving;
}
