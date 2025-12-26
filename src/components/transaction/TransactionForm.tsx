import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { Transaction } from "../../store/Transactions/transactionType";
import {
  addTransaction,
  updateTransaction,
} from "../../store/Transactions/transactionsSlice";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import FilterSelect from "../ui/Select";
import {
  STATUS_OPTIONS,
  TRANSACTION_OPTIONS,
} from "../../../data/filterOptionsData";
import type { SelectOption } from "../../types/FilterTypes";

export default function TransactionDrawer({
  onClose,
}: {
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const editingTransaction = useSelector(
    (state: RootState) => state.transactions.editingTransaction
  );
  const intialForm: Transaction = {
    id: 0,
    date: "",
    description: "",
    account: "",
    amount: 0,
    type: null,
    status: "Pending",
    clientDetail: {
      name: "",
      image: "",
      inv: "",
    },
  };

  const [form, setForm] = useState<Transaction>(
    editingTransaction ?? intialForm
  );

  const handleSubmit = () => {
    if (editingTransaction) {
      dispatch(updateTransaction(form));
    } else {
      dispatch(addTransaction(form));
    }
    onClose();
    setForm(intialForm);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Date"
        type="date"
        className="w-full py-2! rounded"
        placeholder="Enter the Date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <Input
        label="Client Image Link"
        className="w-full py-2! rounded"
        placeholder="Enter the Client Image"
        value={form.clientDetail.image}
        onChange={(e) =>
          setForm({
            ...form,
            clientDetail: {
              ...form.clientDetail,
              image: e.target.value,
            },
          })
        }
      />
      <Input
        label="Client Name"
        className="w-full py-2! rounded"
        placeholder="Enter the Client Name"
        value={form.clientDetail.name}
        onChange={(e) =>
          setForm({
            ...form,
            clientDetail: {
              ...form.clientDetail,
              name: e.target.value,
            },
          })
        }
      />
      <Input
        label="Invoice"
        className="w-full py-2! rounded"
        placeholder="Enter the Invoice"
        value={form.clientDetail.inv}
        onChange={(e) =>
          setForm({
            ...form,
            clientDetail: {
              ...form.clientDetail,
              inv: e.target.value,
            },
          })
        }
      />
      <Input
        label="Account"
        className="w-full py-2! rounded"
        placeholder="Enter the Bank Account"
        value={form.account}
        onChange={(e) => setForm({ ...form, account: e.target.value })}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        type="number"
        className="w-full py-2! rounded"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
      />

      <Input
        label="Description"
        className="w-full py-2! rounded"
        placeholder="Enter the Desscription"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <FilterSelect
        label="Clients Status"
        placeholder="Select a client status"
        options={TRANSACTION_OPTIONS}
        value={
          TRANSACTION_OPTIONS.find((opt) => opt.value === form.type) ?? null
        }
        onChange={(val) =>
          setForm({
            ...form,
            type: (val as SelectOption).value as "IN" | "OUT",
          })
        }
      />
      <FilterSelect
        label="Transaction Status"
        placeholder="Select a status"
        options={STATUS_OPTIONS}
        value={STATUS_OPTIONS.find((opt) => opt.value === form.type) ?? null}
        onChange={(val) =>
          setForm({
            ...form,
            status: (val as SelectOption).value as
              | "Pending"
              | "Completed"
              | "Failed",
          })
        }
      />
      <div className="flex gap-2">
        <Button
          buttonType="submit"
          buttonPadding="px-3! py-1!"
          title={`${editingTransaction ? "Update" : "Add"} Transaction`}
          onClick={handleSubmit}
          className="w-fit bg-primary text-gray-900 py-1.5 rounded font-bold"
        />
        <Button
          buttonType="button"
          title="Cancel"
          buttonPadding="px-3 py-2.5"
          className="w-fit bg-transparent text border border-gray-600 text-gray-900 py-2 rounded font-bold"
          onClick={() => {
            onClose();
            setForm(intialForm);
          }}
        />
      </div>
    </div>
  );
}
