import { TransactionData } from "../../../data/transactionTableData";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "./transactionType";

interface TransactionState {
  transactions: Transaction[];
  editingTransaction: Transaction | null;
}

const initialState: TransactionState = {
  transactions: TransactionData,
  editingTransaction: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload);
    },

    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },

    setEditingTransaction(state, action: PayloadAction<Transaction | null>) {
      state.editingTransaction = action.payload;
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setEditingTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
