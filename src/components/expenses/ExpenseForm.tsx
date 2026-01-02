import { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { useEscapeKey } from "../../utils/useEscapekey";
import FilterSelect from "../ui/Select";
import type { SelectOption } from "../../types/FilterTypes";
import type { Expense, ExpenseOptions } from "./ExpenseColumn";
import { expenseOptions } from "../../types/ExpenseOptionTypes";

type FormErrors = Partial<Record<"expenseOptions", string>>;

export default function ExpenseForm({
  onClose,
  setExpenseDataReset,
}: {
  onClose: () => void;
  setExpenseDataReset: (resetForm: () => void) => void;
}) {
  const initialForm: Expense = {
    id: 0,
    expenseOptions: null,
    notes: "",
  };

  const [expenseForm, setExpenseForm] = useState<Expense>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  /** Reset */
  const resetForm = useCallback(() => {
    setExpenseForm(initialForm);
    setErrors({});
  }, []);

  /** Expose reset */
  useEffect(() => {
    setExpenseDataReset(resetForm);
  }, [resetForm, setExpenseDataReset, onClose]);

  /** Escape key */
  const handleEscape = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEscapeKey(handleEscape);

  /** Validation */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!expenseForm.expenseOptions)
      newErrors.expenseOptions = "Expense option is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit */
  const handleSubmit = () => {
    if (!validate()) return;

    const payload: Expense = {
      ...expenseForm,
      expenseOptions: expenseForm.expenseOptions as ExpenseOptions,
    };

    console.log("Expense Saved:", payload);

    resetForm();
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Expense Option */}
      <div className="space-y-2">
        <FilterSelect
          label="Expense Option"
          required
          options={expenseOptions}
          placeholder="Select expense option"
          value={
            expenseForm.expenseOptions
              ? {
                  label: expenseForm.expenseOptions,
                  value: expenseForm.expenseOptions,
                }
              : null
          }
          onChange={(val) => {
            setExpenseForm((prev) => ({
              ...prev,
              expenseOptions: (val as SelectOption)?.value as ExpenseOptions,
            }));
            setErrors({ ...errors, expenseOptions: "" });
          }}
        />

        {errors.expenseOptions && (
          <p className="text-xs text-red-400">{errors.expenseOptions}</p>
        )}
      </div>

      {/* Notes */}
      <Input
        label="Notes"
        value={expenseForm.notes}
        placeholder="Enter notes"
        onChange={(e) =>
          setExpenseForm((prev) => ({
            ...prev,
            notes: e.target.value,
          }))
        }
        className="py-2!"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          title="Save Expense"
          onClick={handleSubmit}
          buttonType="submit"
          className="bg-primary text-gray-900 font-bold"
          buttonPadding="px-2! py-1! lg:px-1.5! lg:py-2!"
        />
        <Button
          title="Cancel"
          buttonType="button"
          className="border border-gray-600 bg-transparent font-bold"
          onClick={() => {
            resetForm();
            onClose();
          }}
          buttonPadding="px-2! py-1! lg:px-1.5! lg:py-2!"
        />
      </div>
    </div>
  );
}
