export interface Transaction {
  _id?: string;
  card_id: string;
  trans_date: Date;
  trans_amount: number;
  trans_type: string;
  category_id: string;
  trans_note?: string;
}


export interface SearchTransaction {
  page?: number;
  limit?: number;
  trans_type?: string;
}

export interface TransactionData {
  _id?: string;
  card_id: {
    _id: string;
    card_number: number;
    // Add other card properties as needed
  };
  category_id: {
    _id: string;
    cate_name: string;
    // Add other category properties as needed
  };
  trans_date: string | Date;
  trans_amount: number;
  trans_type: string;
  trans_note?: string;
}