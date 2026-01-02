import { useCallback, useEffect, useState } from "react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { useEscapeKey } from "../../utils/useEscapekey";
import FilterSelect from "../ui/Select";
import type { SelectOption } from "../../types/FilterTypes";
import { GrAdd } from "react-icons/gr";
import { VscRemove } from "react-icons/vsc";
import { generateInvoiceNumber } from "../../utils/genrateInvoiceNumbers";
import ImageUpload from "../ui/ImageUpload";
import PdfDownload from "./PdfDownLoad";
import { InvoiceClientOptions } from "../../types/InvoiceClientTypes";
import { expenseAccountOptions } from "../../types/InvoiceAccountTypes";

interface InvoiceItem {
  description: string;
  quantity: number | string;
  rate: number | string;
}

export interface InvoiceFormState {
  client: SelectOption | null;
  receivingAccount: SelectOption | null;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  discount: number | "";
  tax: number | "";
  logo: File | null;
}

type ItemErrors = {
  description?: string;
  quantity?: string;
  rate?: string;
};

type FormErrors = {
  client?: string;
  receivingAccount?: string;
  issueDate?: string;
  dueDate?: string;
  items?: ItemErrors[];
  discount?: string;
  tax?: string;
  logo?: string;
};

export default function InvoiceForm({
  onClose,
  setInvoiceDataReset,
}: {
  onClose: () => void;
  setInvoiceDataReset: (resetForm: () => void) => void;
}) {
  const initialForm: InvoiceFormState = {
    client: null,
    receivingAccount: null,
    invoiceNumber: generateInvoiceNumber(),
    issueDate: "",
    dueDate: "",
    items: [{ description: "", quantity: "", rate: "" }],
    discount: "",
    tax: "",
    logo: null,
  };

  const [invoiceForm, setInvoiceForm] = useState<InvoiceFormState>(initialForm);
  console.log("🚀 ~ InvoiceForm ~ invoiceForm:", invoiceForm);

  const [errors, setErrors] = useState<FormErrors>({});
  const [valid, setValid] = useState(false);

  /* ---------------- RESET ---------------- */

  const resetForm = useCallback(() => {
    setInvoiceForm(initialForm);
    setErrors({});
  }, []);

  useEffect(() => {
    setInvoiceDataReset(resetForm);
  }, [resetForm, setInvoiceDataReset, onClose]);

  /* ---------------- ESCAPE --------------- */

  const handleEscape = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEscapeKey(handleEscape);

  const addItem = () => {
    setInvoiceForm((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "", rate: "" }],
    }));
  };

  const removeItem = (index: number) => {
    if (invoiceForm.items.length === 1) return;
    setInvoiceForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const validateItemField = (
    field: keyof InvoiceItem,
    value: string | number
  ): string | undefined => {
    if (field === "description") {
      return value && String(value).trim()
        ? undefined
        : "Description is required.";
    }

    if (field === "quantity") {
      return value !== "" && Number(value) > 0
        ? undefined
        : "Quantity must be greater than 0.";
    }

    if (field === "rate") {
      return value !== "" && Number(value) > 0
        ? undefined
        : "Rate must be greater than 0.";
    }

    return undefined;
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    // Update form
    setInvoiceForm((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, items: updatedItems };
    });

    // Validate field dynamically
    const error = validateItemField(field, value);

    setErrors((prev) => {
      const items = prev.items ? [...prev.items] : [];
      items[index] = { ...items[index], [field]: error };
      return { ...prev, items };
    });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const itemErrors: ItemErrors[] = [];

    if (!invoiceForm.client) newErrors.client = "Client is required.";
    if (!invoiceForm.receivingAccount)
      newErrors.receivingAccount = "Receiving account is required.";
    if (!invoiceForm.issueDate) newErrors.issueDate = "Issue date is required.";
    if (!invoiceForm.dueDate) newErrors.dueDate = "Due date is required.";

    invoiceForm.items.forEach((item, index) => {
      const err: ItemErrors = {};

      if (!item.description.trim()) {
        err.description = "Description is required.";
      }

      if (item.quantity === "" || Number(item.quantity) <= 0) {
        err.quantity = "Quantity must be greater than 0.";
      }

      if (item.rate === "" || Number(item.rate) <= 0) {
        err.rate = "Rate must be greater than 0.";
      }

      if (Object.keys(err).length > 0) {
        itemErrors[index] = err;
      }
    });

    if (itemErrors.some((e) => e && Object.keys(e).length > 0)) {
      newErrors.items = itemErrors;
    }

    if (invoiceForm.discount === "" || invoiceForm.discount < 0) {
      newErrors.discount = "Discount is required and cannot be negative.";
    }

    if (invoiceForm.tax === "" || invoiceForm.tax < 0) {
      newErrors.tax = "Tax is required and cannot be negative.";
    }

    if (!invoiceForm.logo) {
      newErrors.logo = "Logo is required.";
    } else if (invoiceForm.logo.type !== "image/png") {
      newErrors.logo = "Only PNG files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNumberField = (
    field: "discount" | "tax",
    value: number | ""
  ) => {
    const error =
      value === "" || value < 0 || value > 99
        ? `${field === "discount" ? "Discount" : "Tax"} must be 0 or greater.`
        : undefined;

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateFeild = (
    field: keyof InvoiceFormState,
    value: string | null | SelectOption
  ) => {
    let error: string | undefined = undefined;

    if (field === "client" || field === "receivingAccount") {
      error = value
        ? undefined
        : `${field === "client" ? "Client" : "Receiving account"} is required.`;
    }

    if (field === "issueDate" || field === "dueDate") {
      error = value
        ? undefined
        : `${field === "issueDate" ? "Issue date" : "Due date"} is required.`;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Invoice Saved:", invoiceForm);

    resetForm();
    setErrors({});
    onClose();
  };

  return (
    <div className="space-y-4">
      <FilterSelect
        label="Select Client"
        required
        options={InvoiceClientOptions}
        value={invoiceForm.client}
        onChange={(val) => {
          setInvoiceForm({ ...invoiceForm, client: val as SelectOption });
          validateFeild("client", val as SelectOption);
        }}
        error={errors.client}
      />

      <FilterSelect
        label="Select Receiving Account"
        required
        options={expenseAccountOptions}
        value={invoiceForm.receivingAccount}
        onChange={(val) => {
          setInvoiceForm({
            ...invoiceForm,
            receivingAccount: val as SelectOption,
          });
          validateFeild("receivingAccount", val as SelectOption);
        }}
        error={errors.receivingAccount}
      />

      <Input
        label="Invoice Number"
        value={invoiceForm.invoiceNumber}
        className="opacity-50 cursor-not-allowed"
        disabled
      />

      <Input
        label="Issue Date"
        type="date"
        required
        value={invoiceForm?.issueDate}
        error={errors.issueDate}
        onChange={(e) => {
          setInvoiceForm({ ...invoiceForm, issueDate: e.target.value });
          validateFeild("issueDate", e.target.value);
        }}
      />

      <Input
        label="Due Date"
        type="date"
        required
        value={invoiceForm.dueDate}
        error={errors.dueDate}
        onChange={(e) => {
          setInvoiceForm({ ...invoiceForm, dueDate: e.target.value });
          validateFeild("dueDate", e.target.value);
        }}
      />

      {/* ITEMS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">
            Items <span className="text-red-400"> *</span>
          </h3>
          <GrAdd
            className="cursor-pointer text-gray-600 dark:text-gray-400 font-semibold border border-gray-300 dark:border-gray-600 rounded-md p-1"
            onClick={addItem}
            size={25}
          />
        </div>

        {invoiceForm.items.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 border border-gray-300 dark:border-gray-600 p-3 rounded-md"
          >
            <div className="space-y-3">
              <Input
                label="Description"
                placeholder="Enter description"
                required
                value={item.description}
                error={errors.items?.[index]?.description}
                onChange={(e) =>
                  updateItem(index, "description", e.target.value)
                }
              />

              <div className="flex gap-3">
                <Input
                  label="Quantity"
                  type="number"
                  required
                  placeholder="Enter quantity"
                  value={item.quantity}
                  error={errors.items?.[index]?.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "quantity",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={0}
                />

                <Input
                  label="Rate"
                  type="number"
                  required
                  placeholder="Enter rate"
                  value={item.rate}
                  error={errors.items?.[index]?.rate}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "rate",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  min={0}
                />
              </div>
            </div>
            <VscRemove
              title="Remove"
              className={`border w-fit border-gray-400 rounded-md p-0.5 text-gray-500 dark:text-gray-400 ${
                invoiceForm.items.length === 1
                  ? "cursor-not-allowed! opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => removeItem(index)}
              size={25}
            />
          </div>
        ))}
      </div>

      <Input
        label="Discount (%)"
        placeholder="Enter discount"
        type="tel"
        required
        min={0}
        value={invoiceForm.discount}
        error={errors.discount}
        onChange={(e) => {
          let val = e.target.value === "" ? "" : Number(e.target.value);

          if (val !== "") {
            val = Math.max(0, Math.min(99, val as number));
          }

          setInvoiceForm({ ...invoiceForm, discount: val });
          validateNumberField("discount", val);
        }}
      />

      <Input
        label="Tax (%)"
        type="number"
        placeholder="Enter tax"
        required
        min={0}
        value={invoiceForm.tax}
        error={errors.tax}
        onChange={(e) => {
          const val = e.target.value === "" ? "" : Number(e.target.value);
          setInvoiceForm({ ...invoiceForm, tax: val });
          validateNumberField("tax", val);
        }}
      />

      <ImageUpload
        label="Upload Logo (PNG only)"
        required
        value={invoiceForm.logo}
        error={errors.logo}
        onChange={(file) => {
          setInvoiceForm({ ...invoiceForm, logo: file });

          setErrors((prev) => ({
            ...prev,
            logo: !file
              ? "Logo is required."
              : file.type !== "image/png"
              ? "Only PNG files are allowed."
              : undefined,
          }));
        }}
      />

      {/* ACTIONS */}
      <div className="flex gap-2">
        <Button
          title="Save Invoice"
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
        <PdfDownload disabled={valid} invoiceForm={invoiceForm} />
      </div>
    </div>
  );
}
