"use client"
interface ButtonProps {
    title: string;
    buttonType: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    buttonPadding?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    buttonType = "button",
    onClick,
    className = "",
    buttonPadding = "px-3 py-2 lg:px-4 lg:py-3"
}) => {
    return (
        <button
            type={buttonType}
            onClick={onClick}
            className={`inline-flex items-center justify-center rounded-md text-md font-bold transition cursor-pointer ${buttonPadding} ${className}`}
        >
            {title}
        </button>
    );
};
