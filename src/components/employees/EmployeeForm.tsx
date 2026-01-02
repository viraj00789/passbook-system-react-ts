import { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { useEscapeKey } from "../../utils/useEscapekey";
import type { SelectOption } from "../../types/FilterTypes";
import type { Employee, PaymentAccount, Role } from "./EmployeeColumn";
import {
  paymentAccountOptions,
  roleOptions,
} from "../../types/EmployeeOptionTypes";
import FilterSelect from "../ui/Select";

type FormErrors = Partial<
  Record<"employeeName" | "email" | "role" | "monthlySalary", string>
>;

export default function EmployeeForm({
  onClose,
  setEmployeeDataReset,
}: {
  onClose: () => void;
  setEmployeeDataReset: (resetForm: () => void) => void;
}) {
  const initialForm: Employee = {
    id: 0,
    employeeName: "",
    email: "",
    role: "Web",
    monthlySalary: 0,
    paymentAccount: undefined,
  };

  const [employeeForm, setEmployeeForm] = useState<Employee>(initialForm);

  const [role, setRole] = useState<SelectOption | null>(null);
  const [paymentAccount, setPaymentAccount] = useState<SelectOption | null>(
    null
  );

  const [errors, setErrors] = useState<FormErrors>({});

  /** Reset */
  const resetForm = useCallback(() => {
    setEmployeeForm(initialForm);
    setRole(null);
    setPaymentAccount(null);
    setErrors({});
  }, []);

  /** Expose reset */
  useEffect(() => {
    setEmployeeDataReset(resetForm);
  }, [resetForm, setEmployeeDataReset, onClose]);

  /** Escape key */
  const handleEscape = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEscapeKey(handleEscape);

  /** Validation */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!employeeForm.employeeName)
      newErrors.employeeName = "Employee name is required.";

    if (!employeeForm.email) newErrors.email = "Email is required.";

    if (!role) newErrors.role = "Role is required.";

    if (!employeeForm.monthlySalary || employeeForm.monthlySalary <= 0)
      newErrors.monthlySalary = "Valid salary is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit */
  const handleSubmit = () => {
    if (!validate()) return;

    const payload: Employee = {
      ...employeeForm,
      role: role?.value as Role,
      paymentAccount: paymentAccount
        ? (paymentAccount.value as PaymentAccount)
        : undefined,
    };

    console.log("Employee Saved:", payload);

    resetForm();
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Employee Name */}
      <Input
        label="Employee Name"
        required
        value={employeeForm.employeeName}
        error={errors.employeeName}
        placeholder="Enter employee name"
        onChange={(e) => {
          setEmployeeForm({
            ...employeeForm,
            employeeName: e.target.value,
          });
          setErrors({ ...errors, employeeName: "" });
        }}
        className="py-2!"
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        required
        value={employeeForm.email}
        error={errors.email}
        placeholder="Enter employee email"
        onChange={(e) => {
          setEmployeeForm({
            ...employeeForm,
            email: e.target.value,
          });
          setErrors({ ...errors, email: "" });
        }}
        className="py-2!"
      />

      {/* Role Select */}
      <div className="space-y-1">
        <FilterSelect
          label="Role"
          required
          options={roleOptions}
          value={role}
          onChange={(val) => {
            setRole(val as SelectOption);
            setErrors({ ...errors, role: "" });
          }}
          placeholder="Select role"
        />
        {errors.role && <p className="text-xs mt-2 text-red-400">{errors.role}</p>}
      </div>

      {/* Monthly Salary */}
      <Input
        label="Monthly Salary"
        type="number"
        required
        value={employeeForm.monthlySalary || ""}
        error={errors.monthlySalary}
        placeholder="Enter monthly salary"
        onChange={(e) => {
          setEmployeeForm({
            ...employeeForm,
            monthlySalary: Number(e.target.value),
          });
          setErrors({ ...errors, monthlySalary: "" });
        }}
        className="py-2!"
      />

      {/* Payment Account (Optional) */}
      <FilterSelect
        label="Payment Account"
        options={paymentAccountOptions}
        value={paymentAccount}
        onChange={(val) => setPaymentAccount(val as SelectOption)}
        placeholder="Select payment account"
      />

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button
          title="Save Employee"
          onClick={handleSubmit}
          buttonType="submit"
          className="bg-primary text-gray-900 font-bold"
        />
        <Button
          title="Cancel"
          buttonType="button"
          className="border border-gray-600 bg-transparent font-bold"
          onClick={() => {
            resetForm();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
