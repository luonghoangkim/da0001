interface Category {
    category_name: string;
}

interface PopulatedSaving {
    _id: string;
    saving_goals_amount: number;
    saving_amount: number;
    saving_date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface GoalsResponse {
    category: Category;
    populatedSaving: PopulatedSaving;
}
