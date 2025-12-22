import React from "react";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        onChange={handleChange}
        className={`
          block w-full rounded-md
          bg-transparent
          border border-gray-500
          px-3 py-2 lg:py-3 lg:px-4
          text-sm
          text
          focus:outline-none
          focus:ring-2 focus:ring-primary
          transition placeholder:text-gray-500
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
