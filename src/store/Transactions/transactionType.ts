export interface ClientDetail {
  name: string;
  image: string;
  inv: string;
}

export interface Transaction {
  id?: number | string;
  date: string;
  description: string;
  clientDetail: ClientDetail;
  account: string;
  amount: number;
  type: "IN" | "OUT" | null;
  status: "Pending" | "Completed" | "Failed";
}
