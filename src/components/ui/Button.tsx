"use client";
interface ButtonProps {
  title: string | React.ReactNode;
  buttonType: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  buttonPadding?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  buttonType = "button",
  onClick,
  className = "",
  buttonPadding = "px-3 py-2 lg:px-4 lg:py-3",
  disabled = false,
}) => {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-md font-bold transition cursor-pointer ${buttonPadding} ${className}`}
    >
      {title}
    </button>
  );
};
