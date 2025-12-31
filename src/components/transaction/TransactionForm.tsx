import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import type { RootState } from "../../store";
import type { Transaction } from "../../store/Transactions/transactionType";
import {
  addTransaction,
  updateTransaction,
} from "../../store/Transactions/transactionsSlice";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import FilterSelect from "../ui/Select";
import { STATUS_OPTIONS } from "../../../data/filterOptionsData";
import type { SelectOption } from "../../types/FilterTypes";

type FormErrors = Partial<
  Record<keyof Transaction | "clientName" | "type" | "status", string>
>;

export default function TransactionDrawer({
  onClose,
  setTransactionReset,
}: {
  onClose: () => void;
  setTransactionReset: (resetForm: () => void) => void;
}) {
  const dispatch = useDispatch();
  const editingTransaction = useSelector(
    (state: RootState) => state.transactions.editingTransaction
  );

  const initialForm: Transaction = {
    id: 0,
    date: "",
    description: "",
    account: "",
    amount: 0,
    type: "IN",
    status: "Completed",
    clientDetail: {
      name: "",
      image: "",
      inv: "",
    },
  };

  const [form, setForm] = useState<Transaction>(
    editingTransaction ?? initialForm
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
  }, []);

  useEffect(() => {
    if (setTransactionReset) {
      setTransactionReset(resetForm);
    }
  }, [setTransactionReset, resetForm, onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.date) newErrors.date = "Date is required";

    if (!form.clientDetail.name)
      newErrors.clientName = "Client name is required";

    if (!form.account) newErrors.account = "Account is required";

    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.type) newErrors.type = "Transaction type is required";

    if (!form.status) newErrors.status = "Transaction status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editingTransaction) {
      dispatch(updateTransaction(form));
    } else {
      dispatch(addTransaction(form));
    }

    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Date */}
      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={(e) => {
          setForm({ ...form, date: e.target.value });
          setErrors({ ...errors, date: "" });
        }}
        required
        error={errors.date}
      />

      {/* Client Name */}
      <Input
        label="Client Name"
        placeholder="Enter the Client Name"
        value={form.clientDetail.name}
        onChange={(e) => {
          setForm({
            ...form,
            clientDetail: {
              ...form.clientDetail,
              name: e.target.value,
            },
          });
          setErrors({ ...errors, clientName: "" });
        }}
        required
        error={errors.clientName}
      />

      {/* Account */}
      <Input
        label="Account"
        placeholder="Enter the Bank Account"
        value={form.account}
        onChange={(e) => {
          setForm({ ...form, account: e.target.value });
          setErrors({ ...errors, account: "" });
        }}
        required
        error={errors.account}
      />

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => {
          setForm({ ...form, amount: Number(e.target.value) });
          setErrors({ ...errors, amount: "" });
        }}
        required
        error={errors.amount}
      />

      {/* Description */}
      <Input
        label="Description"
        placeholder="Enter the Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* IN / OUT Toggle */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Clients Status (IN / OUT) <span className="text-red-500">*</span>
        </label>

        <div
          className={`flex w-fit rounded-xl p-1 bg-gray-100 dark:bg-dark-blue
            ${
              errors.type
                ? "border border-red-500"
                : "border border-gray-300 dark:border-gray-700"
            }`}
        >
          {(["IN", "OUT"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setForm({ ...form, type });
                setErrors({ ...errors, type: "" });
              }}
              className={`px-4 py-1 rounded-lg text-sm font-bold transition-all
                ${
                  form.type === type
                    ? type === "IN"
                      ? "bg-green-status text-secondary"
                      : "bg-red-status text-font-red-status"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
      </div>

      {/* Transaction Status */}
      <div>
        <FilterSelect
          label="Transaction Status"
          placeholder="Select a status"
          options={STATUS_OPTIONS}
          value={
            STATUS_OPTIONS.find((opt) => opt.value === form.status) ?? null
          }
          onChange={(val) => {
            setForm({
              ...form,
              status: (val as SelectOption).value as
                | "Pending"
                | "Completed"
                | "Failed",
            });
            setErrors({ ...errors, status: "" });
          }}
          required
        />

        {errors.status && (
          <p className="text-xs text-red-500 mt-1">{errors.status}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          buttonType="button"
          title={`${editingTransaction ? "Update" : "Add"} Transaction`}
          onClick={handleSubmit}
          className="bg-primary text-gray-900 font-bold"
        />

        <Button
          buttonType="button"
          title="Cancel"
          className="border border-gray-600 text-gray-900 font-bold bg-transparent text"
          onClick={() => {
            setForm(initialForm);
            setErrors({});
            onClose();
          }}
        />
      </div>
    </div>
  );
}
