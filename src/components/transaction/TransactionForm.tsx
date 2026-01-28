import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import type { RootState } from "../../store";

import Input from "../ui/Input";
import { Button } from "../ui/Button";
import FilterSelect from "../ui/Select";

import type { SelectOption } from "../../types/FilterTypes";
import {
  CLIENT_OPTIONS,
  EMPLOYEE_OPTIONS,
  STATUS_OPTIONS,
} from "../../types/TransactionType";
import type { Transaction } from "../../store/Transactions/transactionType";

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
  const editingTransaction = useSelector(
    (state: RootState) => state.transactions.editingTransaction,
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
    editingTransaction ?? initialForm,
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setErrors({});
  }, []);

  useEffect(() => {
    setTransactionReset(resetForm);
  }, [setTransactionReset, resetForm]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.date) newErrors.date = "Date is required";
    if (!form.account) newErrors.account = "Account is required";
    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.clientDetail.name) {
      newErrors.clientName =
        form.type === "IN" ? "Client is required" : "Employee is required";
    }

    if (!form.type) newErrors.type = "Transaction type is required";
    if (!form.status) newErrors.status = "Transaction status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    resetForm();
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

      {/* Client / Employee Select */}
      <FilterSelect
        label={form.type === "IN" ? "Client" : "Employee"}
        placeholder={
          form.type === "IN" ? "Select a client" : "Select a employee"
        }
        options={form.type === "IN" ? CLIENT_OPTIONS : EMPLOYEE_OPTIONS}
        value={
          form.clientDetail.name
            ? {
                label: form.clientDetail.name,
                value: form.clientDetail.name,
              }
            : null
        }
        onChange={(val) => {
          setForm({
            ...form,
            clientDetail: {
              ...form.clientDetail,
              name: (val as SelectOption).value,
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
        placeholder="Enter Bank Account"
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
        placeholder="Enter description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* IN / OUT Toggle */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">
          Payment Type <span className="text-red-500">*</span>
        </label>

        <div className="flex w-fit rounded-xl p-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
          {(["IN", "OUT"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setForm({
                  ...form,
                  type,
                  clientDetail: {
                    ...form.clientDetail,
                    name: "",
                  },
                });
                setErrors({ ...errors, type: "", clientName: "" });
              }}
              className={`px-4 py-1 rounded-lg text-sm font-bold transition text-gray-200 dark:text-white
                ${
                  form.type === type
                    ? type === "IN"
                      ? "bg-green-500 "
                      : "bg-red-400 "
                    : "text-gray-500"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
      </div>

      {/* Transaction Status */}
      <FilterSelect
        label="Transaction Status"
        placeholder="Select status"
        options={STATUS_OPTIONS}
        value={STATUS_OPTIONS.find((opt) => opt.value === form.status) ?? null}
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
        error={errors.status}
      />

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          buttonType="button"
          title={editingTransaction ? "Update Transaction" : "Add Transaction"}
          onClick={handleSubmit}
          className="bg-primary font-bold text-black"
        />

        <Button
          buttonType="button"
          title="Cancel"
          className="border"
          onClick={() => {
            resetForm();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
