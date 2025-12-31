import { useCallback, useState, useEffect } from "react";
import type { Client } from "./ClientsColumn";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { useEscapeKey } from "../../utils/useEscapekey";

type FormErrors = Partial<
  Record<
    | "clientName"
    | "email"
    | "phone"
    | "bankName"
    | "accountNumber"
    | "confirmAccountNumber"
    | "ifscCode",
    string
  >
>;

export default function ClientForm({
  onClose,
  setClientDataReset,
}: {
  onClose: () => void;
  setClientDataReset: (resetForm: () => void) => void;
}) {
  const initialForm: Client = {
    id: 0,
    clientName: "",
    email: "",
    phone: "",
    bankName: {
      name: "",
      accountNumber: "",
      ifscCode: "",
    },
    notes: "",
  };

  const [clientForm, setClientForm] = useState<Client>(initialForm);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasBankDetails, setHasBankDetails] = useState(false);

  // Reset function
  const resetForm = useCallback(() => {
    setClientForm(initialForm);
    setConfirmAccountNumber("");
    setErrors({});
    setHasBankDetails(false);
  }, []);

  // Expose resetForm to parent
  useEffect(() => {
    if (setClientDataReset) setClientDataReset(resetForm);
  }, [setClientDataReset, resetForm, onClose]);

  const handleEscape = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEscapeKey(handleEscape);

  /** Validation */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!clientForm.clientName)
      newErrors.clientName = "Client name is required.";
    if (!clientForm.email) newErrors.email = "Email is required.";

    if (hasBankDetails) {
      if (!clientForm.bankName?.name)
        newErrors.bankName = "Bank name is required.";
      if (!clientForm.bankName?.accountNumber)
        newErrors.accountNumber = "Account number is required.";
      if (!confirmAccountNumber)
        newErrors.confirmAccountNumber = "Confirm account number is required.";
      if (
        clientForm.bankName?.accountNumber &&
        confirmAccountNumber &&
        clientForm.bankName.accountNumber !== confirmAccountNumber
      )
        newErrors.confirmAccountNumber = "Account numbers do not match.";
      if (!clientForm.bankName?.ifscCode)
        newErrors.ifscCode = "IFSC / SWIFT code is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit */
  const handleSubmit = () => {
    if (!validate()) return;

    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Client Name */}
      <Input
        label="Client Name"
        value={clientForm.clientName}
        required
        error={errors.clientName}
        onChange={(e) => {
          setClientForm({ ...clientForm, clientName: e.target.value });
          setErrors({ ...errors, clientName: "" });
        }}
        placeholder="Enter the client name"
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        value={clientForm.email}
        required
        error={errors.email}
        onChange={(e) => {
          setClientForm({ ...clientForm, email: e.target.value });
          setErrors({ ...errors, email: "" });
        }}
        placeholder="Enter the client email"
      />

      {/* Phone */}
      <Input
        label="Phone"
        placeholder="Enter the client phone number"
        value={clientForm.phone}
        onChange={(e) =>
          setClientForm({ ...clientForm, phone: e.target.value })
        }
        maxLength={10}
        type="tel"
      />

      {/* Bank Checkbox */}
      <label className="block font-semibold">Bank Details</label>
      <div className="flex items-center gap-2">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={hasBankDetails}
            onChange={() => {
              const checked = !hasBankDetails;
              setHasBankDetails(checked);
              if (!checked) resetForm();
              setClientForm({
                ...clientForm,
                bankName: {
                  name: "",
                  accountNumber: "",
                  ifscCode: "",
                },
              });
            }}
            className="
              peer h-5 w-5 appearance-none rounded-full
              border border-gray-300 bg-gray-200
              checked:bg-primary checked:border-primary
              cursor-pointer transition-all
            "
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-black">
            ✔
          </span>
        </label>
        <span
          className="cursor-pointer font-semibold"
          onClick={() => {
            setHasBankDetails(!hasBankDetails);
            setClientForm({
              ...clientForm,
              bankName: {
                name: "",
                accountNumber: "",
                ifscCode: "",
              },
            });
          }}
        >
          Check to add Bank Information
        </span>
      </div>

      {/* Bank Fields */}
      {hasBankDetails && (
        <div className="space-y-4">
          <Input
            label="Bank Name"
            placeholder="Enter the bank name"
            required
            error={errors.bankName}
            value={clientForm.bankName?.name}
            onChange={(e) => {
              setClientForm({
                ...clientForm,
                bankName: { ...clientForm.bankName, name: e.target.value },
              });
              setErrors({ ...errors, bankName: "" });
            }}
          />

          <Input
            label="Account Number"
            placeholder="Enter the Account number"
            type="password"
            required
            error={errors.accountNumber}
            value={clientForm.bankName?.accountNumber}
            onChange={(e) => {
              setClientForm({
                ...clientForm,
                bankName: {
                  ...clientForm.bankName,
                  accountNumber: e.target.value,
                },
              });
              setErrors({ ...errors, accountNumber: "" });
            }}
          />

          <Input
            label="Confirm Account Number"
            required
            value={confirmAccountNumber}
            onChange={(e) => {
              const { value } = e.target;
              setConfirmAccountNumber(value);
              setErrors({
                ...errors,
                confirmAccountNumber:
                  value !== clientForm.bankName?.accountNumber
                    ? "Account Number does not match"
                    : "",
              });
            }}
            placeholder="Confirm the account number"
            type="tel"
            error={errors.confirmAccountNumber}
          />

          <Input
            label="IFSC / SWIFT"
            placeholder="Enter the IFSC / SWIFT code"
            required
            error={errors.ifscCode}
            value={clientForm.bankName?.ifscCode}
            onChange={(e) => {
              setClientForm({
                ...clientForm,
                bankName: { ...clientForm.bankName, ifscCode: e.target.value },
              });
              setErrors({ ...errors, ifscCode: "" });
            }}
          />
        </div>
      )}

      {/* Notes */}
      <Input
        label="Notes"
        value={clientForm.notes}
        onChange={(e) =>
          setClientForm({ ...clientForm, notes: e.target.value })
        }
        placeholder="Enter the client notes"
      />

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          title="Save Client"
          onClick={handleSubmit}
          buttonPadding="px-4 py-2"
          buttonType="submit"
          className="bg-primary text-gray-900 font-bold"
        />
        <Button
          title="Reset"
          buttonType="button"
          className="border border-gray-600 text-gray-900 font-bold bg-transparent text"
          onClick={() => {
            resetForm();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
