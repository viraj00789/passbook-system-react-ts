import Select from "react-select";
import type { SelectOption } from "../../types/FilterTypes";

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: SelectOption | SelectOption[] | null;
  onChange: (value: SelectOption | SelectOption[] | null) => void;
  isMulti?: boolean;
  placeholder?: string | undefined;
  required?: boolean;
  marginBottom?: string;
  error?: string | boolean;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  isMulti = false,
  placeholder,
  required = false,
  marginBottom = "mb-2",
  error,
}: SelectProps) {
  return (
    <div>
      <label className={`block ${marginBottom} font-medium text text-sm`}>
        {label} {required && <span className="text-red-500">*</span>}{" "}
      </label>

      <Select<SelectOption, boolean>
        unstyled
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={(val) => onChange(val as SelectOption | SelectOption[])}
        classNamePrefix="rs"
        placeholder={placeholder || " Select an option"}
        classNames={{
          control: ({ isFocused }) =>
            `
    flex min-h-[44px] w-full items-center rounded-md border
    bg-gray-100 dark:bg-dark-blue
    px-3
    transition-colors
    ${
      error
        ? "border-red-400 ring-red-300"
        : isFocused
        ? "border-gray-400 dark:border-gray-300 ring-1 ring-gray-400/40"
        : "border-gray-300 dark:border-gray-600"
    }
    hover:border-gray-400 dark:hover:border-gray-400
  `,

          valueContainer: () => "flex gap-1 overflow-hidden ",

          input: () => "text-gray-900 dark:text-gray-100 ",

          menu: () => `
    mt-2 rounded-md border
    bg-white dark:bg-dark-blue
    border-gray-200 dark:border-gray-600
    shadow-lg
    overflow-hidden
    `,

          menuList: () => "max-h-60 overflow-auto py-1",

          option: ({ isFocused, isSelected }) =>
            `
    px-3 py-2 cursor-pointer text-xs
    transition-colors
    ${
      isSelected
        ? "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
        : isFocused
        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        : "text-gray-700 dark:text-gray-200"
    }
    `,

          singleValue: () => "text-gray-900 dark:text-gray-100 text-sm",

          placeholder: () =>
            "text-gray-400 dark:text-gray-400 text-sm font-medium",

          multiValue: () =>
            `flex items-center gap-1
    bg-primary-400 text-gray-900! dark:text-gray-600! dark:text-gray-100
    rounded-sm px-1.5 py-1 my-1
    text-xs`,
          multiValueLabel: () => "text-inherit",
          multiValueRemove: () => `
    rounded-sm px-1 hover:bg-gray-300 dark:hover:bg-gray-600
    cursor-pointer`,
        }}
      />
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
