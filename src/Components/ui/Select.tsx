import Select from "react-select";
import type { SelectOption } from "../../Types/FilterTypes";

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: SelectOption | SelectOption[] | null;
  onChange: (value: SelectOption | SelectOption[] | null) => void;
  isMulti?: boolean;
  placeholder?: string | undefined;
}

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  isMulti = false,
  placeholder,
}: SelectProps) {
  return (
    <div>
      <label className="block mb-2 font-semibold text">{label}</label>

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
      isFocused
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
    px-3 py-2 cursor-pointer text-sm
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
            "text-gray-400 dark:text-gray-400 text-md font-medium",

          multiValue: () =>
            `
    flex items-center gap-1
    bg-gray-200 dark:bg-gray-700
    text-gray-800 dark:text-gray-100
    rounded-sm px-1 py-1
    text-xs
    `,

          multiValueLabel: () => "text-inherit",

          multiValueRemove: () =>
            `
    rounded-sm px-1
    hover:bg-gray-300 dark:hover:bg-gray-600
    cursor-pointer
    `,
        }}
      />
    </div>
  );
}
