
export interface Bank {
  id: string;
  code: string;
  name: string;
}

export interface CardModel {
  _id?: string;
  card_code: string;
  card_number: number;
  card_amount: number;
  card_short_name?: string;
}