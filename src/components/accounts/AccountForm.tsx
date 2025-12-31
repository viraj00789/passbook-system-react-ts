import { useEffect, useState } from "react";

import Input from "../ui/Input";
import { Button } from "../ui/Button";
import type { Account } from "./AccountsColumn";

type FormErrors = Partial<
  Record<keyof Account | "confirmAccountNumber", string>
>;

export default function AccountDrawer({ onClose }: { onClose: () => void }) {
  const initialForm: Account = {
    id: 0,
    accountName: "",
    accountNumber: "",
    ifscOrSwift: "",
    openingBalance: 0,
    remark: "",
  };

  const [form, setForm] = useState<Account>(initialForm);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setErrors({});
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.accountName) newErrors.accountName = "Account name is required.";

    if (!form.accountNumber)
      newErrors.accountNumber = "Account number is required.";

    if (!confirmAccountNumber)
      newErrors.confirmAccountNumber = "Confirm account number is required.";

    if (
      form.accountNumber &&
      confirmAccountNumber &&
      form.accountNumber !== confirmAccountNumber
    ) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }

    if (!form.ifscOrSwift)
      newErrors.ifscOrSwift = "IFSC / SWIFT code is required.";

    if (!form.openingBalance || form.openingBalance < 0)
      newErrors.openingBalance = "Opening balance must be 0 or greater";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setForm(initialForm);
    setConfirmAccountNumber("");
    setErrors({});
    onClose();
  };

  return (
    <div className="space-y-4 text">
      {/* Account Name */}
      <Input
        label="Account Holder Name"
        placeholder="Enter Account Name"
        value={form.accountName}
        onChange={(e) => {
          setForm({ ...form, accountName: e.target.value });
          setErrors({ ...errors, accountName: "" });
        }}
        required
        error={errors.accountName}
      />

      {/* Account Number */}
      <Input
        label="Account Number"
        type="password"
        placeholder="Enter Account Number"
        value={form.accountNumber}
        onChange={(e) => {
          setForm({ ...form, accountNumber: e.target.value });
          setErrors({ ...errors, accountNumber: "" });
        }}
        required
        error={errors.accountNumber}
      />

      {/* Confirm Account Number */}
      <Input
        label="Confirm Account Number"
        type="number"
        placeholder="Re-enter Account Number"
        value={confirmAccountNumber}
        onChange={(e) => {
          const value = e.target.value;
          setConfirmAccountNumber(value);

          if (value && value !== form.accountNumber) {
            setErrors({
              ...errors,
              confirmAccountNumber: "Account numbers do not match",
            });
          } else {
            setErrors({
              ...errors,
              confirmAccountNumber: "",
            });
          }
        }}
        required
        error={errors.confirmAccountNumber}
      />

      {/* IFSC / SWIFT */}
      <Input
        label="IFSC / SWIFT"
        placeholder="Enter IFSC or SWIFT Code"
        value={form.ifscOrSwift}
        onChange={(e) => {
          setForm({ ...form, ifscOrSwift: e.target.value });
          setErrors({ ...errors, ifscOrSwift: "" });
        }}
        required
        error={errors.ifscOrSwift}
      />

      {/* Opening Balance */}
      <Input
        label="Opening Balance"
        type="number"
        placeholder="Opening Balance"
        value={form.openingBalance}
        onChange={(e) => {
          setForm({
            ...form,
            openingBalance: Number(e.target.value),
          });
          setErrors({ ...errors, openingBalance: "" });
        }}
        required
        error={errors.openingBalance}
      />

      {/* Remark (Optional) */}
      <Input
        label="Remark"
        placeholder="Add remark if any"
        value={form.remark}
        onChange={(e) => setForm({ ...form, remark: e.target.value })}
      />

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          buttonType="button"
          title={`Add  Account`}
          onClick={handleSubmit}
          className="bg-primary text-gray-900 font-bold"
        />

        <Button
          buttonType="button"
          title="Cancel"
          className="border border-gray-600 text-gray-900 font-bold bg-transparent text"
          onClick={() => {
            onClose();
            setForm(initialForm);
            setConfirmAccountNumber("");
            setErrors({});
          }}
        />
      </div>
    </div>
  );
}
