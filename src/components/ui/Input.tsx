import React, { useRef } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  error?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = "",
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleClick = () => {
    if (props.type === "date") {
      inputRef.current?.showPicker?.();
    }
  };

  const isDateEmpty = props.type === "date" && !props.value;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        id={id}
        {...props}
        onChange={handleChange}
        onClick={handleClick}
        className={`
          block w-full rounded-md
          border border-gray-300 dark:border-gray-600 hover:border-gray-400
          px-3 py-2 lg:py-2 lg:px-4
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-primary
          transition bg-gray-100 dark:bg-dark-blue
          ${isDateEmpty ? "text-gray-400" : "text-gray-900 dark:text-white"}
          ${error ? "border-red-400 focus:ring-red-300" : ""}
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
