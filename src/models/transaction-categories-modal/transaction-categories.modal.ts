export interface TransactionCategories {
  _id?: string;
  cate_name: string;
  cate_type: string;
  cate_note: string;
}

export interface SearchCategories {
  page: number;
  limit: number;
  cate_type?: string;
}

export interface UpdateCategories {
  _id?: string;
  cate_name?: string;
  cate_type?: string;
  cate_note?: string;
}
