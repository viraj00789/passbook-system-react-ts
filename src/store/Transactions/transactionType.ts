export interface ClientDetail {
  name: string;
  image: string;
  inv: string;
}

export interface Transaction {
  [key: string]: string | number | undefined | object | null;
  id?: number | string;
  date: string;
  description: string;
  clientDetail: ClientDetail;
  account: string;
  amount: number;
  type: "IN" | "OUT" | null;
  status: "Pending" | "Completed" | "Failed";
}
